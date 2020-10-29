"use strict";
const axios = require("axios").default;
const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer } = require("johnny-five");
const data = {};

const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.11",
    port: 3030,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});




board.on("connect", () => {});






//Board Ready
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
    data.thermometer = {
      celsius: celsius,
      fahrenheit: fahrenheit,
      kelvin: kelvin,
    };
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

    data.accelerometer = {
      x: x,
      y: y,
      z: z,
      roll: roll,
      pitch: pitch,
      orientation: orientation,
      inclination: inclination,
      acceleration: acceleration,
    };
  });
});

axios
  .post("http://192.168.0.12:3000/api/devices", data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
