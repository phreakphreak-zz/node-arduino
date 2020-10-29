"use strict";
const axios = require("axios").default;
const board = require("./board");
const URI ="http://192.168.0.12:3000/api/devices";
const events = {
  ready: "ready",
  change: "change",
  data: "data",
  connect: "connect",
};

// function boardReady(event) {
//   return new Promise((resolve) => {
//     board.on(event, (response) => resolve(response));
//   });
// }

// async function main() {
//   await boardEvent("ready");
// }

board.samplingInterval(1000);
board.on(events.ready, async () => {
  try {
    const data = {};
    data.accelerometer = await accelerometerEvent(events.change);
    data.thermometer = await thermometerEvent(events.change);
    console.log(data);
    const res = await axios.post(URI, data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

function thermometerEvent(event) {
  return new Promise((resolve) => {
    const thermometer = require("./thermometer");
    thermometer.on(event, () => {
      const { celsius, fahrenheit, kelvin } = thermometer;
      const data = {
        celsius: celsius,
        fahrenheit: fahrenheit,
        kelvin: kelvin,
      };
      resolve(data);
    });
  });
}

function accelerometerEvent(event) {
  return new Promise((resolve) => {
    const accelerometer = require("./accelerometer");
    accelerometer.on(event, () => {
      const {
        acceleration,
        inclination,
        orientation,
        pitch,
        roll,
        x,
        y,
        z,
      } = accelerometer;

      const data = {
        x: x,
        y: y,
        z: z,
        roll: roll,
        pitch: pitch,
        orientation: orientation,
        inclination: inclination,
        acceleration: acceleration,
      };
      resolve(data);
    });
  });
}

// board.on("ready", () => {
//   const accelerometer = require("./accelerometer");
//   const thermometer = require("./thermometer");

//   thermometer.on("change", async () => {
//     const { celsius, fahrenheit, kelvin } = await thermometer;
//     data.thermometer = {
//       celsius: celsius,
//       fahrenheit: fahrenheit,
//       kelvin: kelvin,
//     };
//   });

//   accelerometer.on("change", async () => {
//     const {
//       acceleration,
//       inclination,
//       orientation,
//       pitch,
//       roll,
//       x,
//       y,
//       z,
//     } = await accelerometer;

//     data.accelerometer = {
//       x: x,
//       y: y,
//       z: z,
//       roll: roll,
//       pitch: pitch,
//       orientation: orientation,
//       inclination: inclination,
//       acceleration: acceleration,
//     };
//   });
// });
