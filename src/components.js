"use strict";
const { HOST, PORT } = require("./config");
const { EtherPortClient } = require("etherport-client");
const { Gyro, Accelerometer, Thermometer, Board } = require("johnny-five");

const board = new Board({
  port: new EtherPortClient({
    host: HOST,
    port: PORT,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});

const gyro = new Gyro({
  controller: "MPU6050",
});

const accelerometer = new Accelerometer({
  controller: "MPU6050",
});
const thermometer = new Thermometer({
  controller: "LM35",
  pin: "A0",
});
const device = {
    board: "Wemos D1",
    moduleWifi: "ESP8266",
    macAddress: "84:0D:8E:A3:B1:EA",
    thermometer: "LM35",
    accelerometer: "MPU6050",
  };

module.exports.device = device;
module.exports.board = board;
module.exports.accelerometer = accelerometer;
module.exports.thermometer = thermometer;
module.exports.gyro = gyro;
