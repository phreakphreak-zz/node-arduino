"use strict";
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer, Gyro } = require("johnny-five");
const axios = require("axios").default;

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
board.on("ready", () => {
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });

  const accelerometer = new Accelerometer({
    controller: "MPU6050",
    sensitivity: 4096,
  });

  const gyro = new Gyro({
    controller: "MPU6050",
  });

  thermometer.on("change", async () => {
    const { celsius } = await thermometer;
    console.log("celsius:", celsius);
  });

  accelerometer.on("change", async () => {
    const {
      x,
      y,
      z,
      pitch,
      roll,
      acceleration,
      orientation,
      inclination,
    } = await accelerometer;
    console.log("accelerometer:", x, y, z, acceleration);
  });

  gyro.on("change", async () => {
    const { x, y, z, pitch, roll, yaw, isCalibrated } = await gyro;
    console.log("gyro:",x,y,z,pitch,roll,yaw);
  });
});
