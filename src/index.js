"use strict";
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer, Gyro } = require("johnny-five");
const axios = require("axios").default;
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
  //const { data } = await axios.post(URI1, device);

  //device.deviceId = data.deviceId;
  //board.id = data.deviceId;
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
