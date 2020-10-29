"use strict";
const { Accelerometer } = require("johnny-five");
const accelerometer = new Accelerometer({
  controller: "MPU6050",
});

module.exports = accelerometer;
