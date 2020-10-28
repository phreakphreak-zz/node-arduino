"use strict";
const http = require("http");
const axios = require("axios").default;
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
server.listen(4000, () => {
  console.log("server on port 4000");
});

const { EtherPortClient } = require("etherport-client");
const { Accelerometer, Board, Thermometer } = require("johnny-five");
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.11",
    port: 3030,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: true,
});


const dataThermometer = {};
const dataAccelerometer = {};


board.on("ready", () => {
  board.samplingInterval(1000);

  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });

  const accelerometer = new Accelerometer({
    controller: "MPU6050",
  });

  thermometer.on("change", async () => {
    const { celsius, fahrenheit, kelvin } = await thermometer;
    dataThermometer.thermometer = {
      celsius: celsius,
      fahrenheit: fahrenheit,
      kelvin: kelvin,
    };
    axios.post('http://192.168.0.12/api/devices/thermometer',dataThermometer)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  accelerometer.on("change", async () => {
    const {
      acceleration,
      inclination,
      orientation,
      pitch,
      roll,
      x,
      y,
      z,
    } = await accelerometer;

    dataAccelerometer.accelerometer = {
      x: x,
      y: y,
      z: z,
      roll: roll,
      pitch: pitch,
      orientation: orientation,
      inclination: inclination,
      acceleration: acceleration,
    };
    axios.post('http://192.168.0.12/api/devices/accelerometer',dataAccelerometer)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
});





