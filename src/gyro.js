"use strict";
const { Gyro } = require("johnny-five");
const gyro = new Gyro({
  controller: "MPU6050",
});

module.exports = gyro;
