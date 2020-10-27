"use strict";

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

board.on("ready", () => {
  board.samplingInterval(1000);
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });


  const accelerometer = new Accelerometer({
    controller: "MPU6050",
  });

    thermometer.on("data", async () => {
    const { celsius, fahrenheit, kelvin } = await thermometer;
    console.log(`${celsius} C - ${fahrenheit} F - ${kelvin} K`);
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

    console.log("Accelerometer:");
    console.log("  x            : ", x);
    console.log("  y            : ", y);
    console.log("  z            : ", z);
    console.log("  pitch        : ", pitch);
    console.log("  roll         : ", roll);
    console.log("  acceleration : ", acceleration);
    console.log("  inclination  : ", inclination);
    console.log("  orientation  : ", orientation);
    console.log(new Date());
    console.log("--------------------------------------");
  });
});
