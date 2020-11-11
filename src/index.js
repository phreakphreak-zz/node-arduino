"use strict";
const { URI1, URI2, URI3, EVENTS } = require("./config");
const axios = require("axios").default;
const {
  board,
  gyro,
  accelerometer,
  thermometer,
  device,
} = require("./components");

board.samplingInterval(1000);
board.on(EVENTS.ready, async () => {
  const { data } = await axios.post(URI1, device);

  device.deviceId = data.deviceId;
  board.id = data.deviceId;
  thermometer.on(EVENTS.change, async () => {
    const { C, F, K } = await thermometer;
  });
  accelerometer.on(EVENTS.change, async () => {
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
  });
  gyro.on(EVENTS.change, async () => {
    const { x, y, z, pitch, roll, yaw, rate, isCalibrated } = await gyro;
  });
});
