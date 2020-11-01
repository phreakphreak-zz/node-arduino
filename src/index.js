"use strict";
//obtner object con info de las interfaces

const networkInterfaces = require("os").networkInterfaces();


//console.log(getMac(networkInterfaces));

//Settings
const { URI, KEY_SECRET, EVENTS } = require("./config");
const { Device } = require("./Device");
const axios = require("axios").default;
const board = require("./board");

const mac_address = "84:0D:8E:A3:B1:EA";

board.samplingInterval(1000);
board.on(EVENTS.ready, () => {
  axios
    .post(URI, {
      numberSerie: 123456,
      tokenDevice: "",
      macAdress: mac_address,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  const data = {};
  const thermometer = require("./thermometer");
  const accelerometer = require("./accelerometer");
  thermometer.on(EVENTS.change, async () => {
    const { celsius, fahrenheit, kelvin } = await thermometer;
    data.thermometer = {
      celsius: celsius,
      fahrenheit: fahrenheit,
      kelvin: kelvin,
    };
  });

  accelerometer.on(EVENTS.change, async () => {
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
    console.log(data);
  });
});
