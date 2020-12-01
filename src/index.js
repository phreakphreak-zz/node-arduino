"use strict";
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer, Gyro } = require("johnny-five");
const axios = require("axios").default;
const BASE = "http://localhost:3000/api";
//const BASE = "https://cow-api-services.herokuapp.com/api";
const URI_DEV = `${BASE}/device`;
const URI_ACCE = `${BASE}/accelerometer`;
const URI_GYRO = `${BASE}/gyro`;
const URI_THER = `${BASE}/thermometer`;
const device = {
  number: 1,
  board: "Wemos D1",
  moduleWifi: "ESP8266",
  macAddress: "84:0D:8E:A3:B1:EA",
  thermometer: "LM35",
  accelerometer: "MPU6050",
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
board.samplingInterval(1000);
board.on("ready", async () => {
  const { _id } = await axios.get(URI_DEV, {
    params: {
      id: board.id,
    },
  });
  if (!_id) {
    const { deviceId } = await axios.post(URI_DEV, device);
    board.id = deviceId;
  }

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
    // console.log("thermometer");
    // console.log(`Celsius: ${C}`);
    // console.log(`Fahrenheit: ${F}`);
    // console.log(`Kelvin: ${K}`);
    const { message } = await axios.post(URI_THER, {
      C,
      K,
      F,
      deviceId: board.id,
    });

    console.log("thermometer:", message);
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
    // console.log("Acclerometer");
    // console.log(`x: ${x}`);
    // console.log(`y: ${y}`);
    // console.log(`z: ${z}`);
    // console.log(`pitch: ${pitch}`);
    // console.log(`roll: ${roll}`);
    // console.log(`inclination: ${inclination}`);
    // console.log(`orientation: ${orientation}`);
    // console.log(`acceleration: ${acceleration}`);
    const {message} = await axios.post(URI_ACCE, {
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

    console.log("accelerometer:", message);
  });

  gyro.on("change", async () => {
    const { x, y, z, pitch, roll, yaw, isCalibrated } = await gyro;
    // console.log("Gyro");
    // console.log(`x: ${x}`);
    // console.log(`y: ${y}`);
    // console.log(`z: ${z}`);
    // console.log(`pitch: ${pitch}`);
    // console.log(`roll: ${roll}`);
    // console.log(`yaw: ${yaw}`);
    // console.log(`isCalibrated: ${isCalibrated}`);

    const { message } = await axios.post(URI_ACCE, {
      x,
      y,
      z,
      pitch,
      roll,
      yaw,
      isCalibrated,
      deviceId: board.id,
    });

    console.log("gyro:", message);
  });
});
