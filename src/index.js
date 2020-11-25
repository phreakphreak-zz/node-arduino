"use strict";
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer, Gyro } = require("johnny-five");
const axios = require("axios").default;
const BASE = "http://localhost:3000/api";
const URI_DEV = `${BASE}/device`;
const URI_ACCE = `${BASE}/accelerometer`;
const URI_GYRO = `${BASE}/gyro`;
const URI_THER = `${BASE}/thermometer`;
const device = {
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
  const { data } = await axios.post(URI_DEV, device);
  device.deviceId = data.deviceId;
  board.id = data.deviceId;

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
    await axios.post(URI_THER, {
      C,
      F,
      K,
      deviceId: device.deviceId,
    });
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
    axios.post(URI_ACCE, {
      x,
      y,
      z,
      pitch,
      roll,
      inclination,
      orientation,
      acceleration,
      deviceId: device.deviceId,
    });
  });

  gyro.on("change", async () => {
    const { x, y, z, pitch, roll, yaw, isCalibrated } = await gyro;
    await axios.post(URI_GYRO, {
      x,
      y,
      z,
      pitch,
      roll,
      yaw,
      isCalibrated,
      deviceId: device.deviceId,
    });
  });
});
