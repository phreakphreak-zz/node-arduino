"use strict";
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer, Gyro } = require("johnny-five");
const axios = require("axios").default;
//const BASE = "http://192.168.0.44:3000";
const BASE = "https://cow-services.herokuapp.com";
const URI_DEV = `${BASE}/devices`;
const URI_ACCE = `${BASE}/accelerometer`;
const URI_GYRO = `${BASE}/gyro`;
const URI_THER = `${BASE}/thermometer`;
let oldAccelerometer;
let oldGyro;
let oldThermometer;

async function sendData(oldValues, newValues, uri, body, component) {
  if (!oldValues) {
    const { data } = await axios.post(uri, body);
    oldValues = newValues;
    console.log(`${component}: ${data._id}`);
  } else {
    const res = newValues.every(function (v, i) {
      return v === oldValues[i];
    });
    if (!res) {
      const { data } = await axios.post(uri, body);
      oldValues = newValues;
      console.log(`${component}: ${data._id}`);
    }
  }
}

const device = {
  number: 1,
  board: "Wemos D1",
  moduleWifi: "ESP8266",
  macAddress: "84:0D:8E:A3:B1:EA",
  thermometer: "LM35",
  accelerometer: "MPU6050",
  gyro: "MPU6050",
};
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.8",
    port: 3030,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});
board.id = "5fd147e062a6f65fa202b68c";

board.samplingInterval(1000);
board.on("ready", async () => {
  console.log(board.id);
  
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });

  const accelerometer = new Accelerometer({
    controller: "MPU6050",
    sensitivity: 16384,
  });

  const gyro = new Gyro({
    controller: "MPU6050",
  });

  thermometer.on("change", async () => {
    const { C, F, K } = await thermometer;
    let newThermometer = [C, F, K];
    let body = {
      C,
      F,
      K,
      deviceId: board.id,
    };
    await sendData(
      oldThermometer,
      newThermometer,
      URI_THER,
      body,
      "thermometer"
    );
  });

  accelerometer.on("change", async () => {
    const {
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
    } = await accelerometer;
    let body = {
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
      deviceId: board.id,
    };
    let newAccelerometer = [
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
    ];

    if (!oldAccelerometer) {
      const { data } = await axios.post(URI_ACCE, {
        x,
        y,
        z,
        pitch,
        roll,
        inclination,
        orientation,
        acceleration,
        deviceId: board.id,
      });
      oldAccelerometer = [
        x,
        y,
        z,
        pitch,
        roll,
        inclination,
        orientation,
        acceleration,
      ];

      console.log("accelerometer:", data._id);
    } else {
      const res = newAccelerometer.every(function (v, i) {
        return v === oldAccelerometer[i];
      });

      if (!res) {
        const { data } = await axios.post(URI_ACCE, {
          x,
          y,
          z,
          pitch,
          roll,
          inclination,
          orientation,
          acceleration,
          deviceId: board.id,
        });
        oldAccelerometer = [
          x,
          y,
          z,
          pitch,
          roll,
          inclination,
          orientation,
          acceleration,
        ];

        console.log("accelerometer:", data._id);
      }
    }
  });

  gyro.on("change", async () => {
    const { x, y, z, pitch, roll, yaw, isCalibrated } = await gyro;
    let body = {
      x,
      y,
      z,
      pitch,
      roll,
      yaw,
      isCalibrated,
      deviceId: board.id,
    };
    let newGyro = [x, y, z, pitch, roll, yaw, isCalibrated];
    await sendData(oldGyro, newGyro, URI_GYRO, body, "gyro");
  });
});
