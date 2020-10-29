"use strict";
const { Thermometer } = require("johnny-five");
const thermometer = new Thermometer({
  controller: "LM35",
  pin: "A0",
});

module.exports = thermometer;