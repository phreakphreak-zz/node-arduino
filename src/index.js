"use strict";
const { URI1, URI2, URI3, KEY_SECRET, EVENTS } = require("./config");
const axios = require("axios").default;
const board = require("./board");
const { IMU } = require("johnny-five");
const device = {
  board: "Wemos D1",
  moduleWifi: "ESP8266",
  macAddress: "84:0D:8E:A3:B1:EA",
  thermometer: "LM35",
  accelerometer: "MPU6050",
};

board.samplingInterval(1000);
board.on(EVENTS.ready, async () => {
  const { data } = await axios.post(URI1, device);
  device.deviceId = data.deviceId;
  board.id = data.deviceId;

  // const gyro = require("./gyro");
  // const thermometer = require("./thermometer");
  // const accelerometer = require("./accelerometer");

  const accelerometer = new IMU({
    controller: "MPU6050",
  });

  accelerometer.on("data", function (err, data) {
    console.log(
      "Accelerometer: %d, %d, %d",
      this.accelerometer.x,
      this.accelerometer.z,
      this.accelerometer.z
    );
    console.log("Gyro: %d, %d, %d", this.gyro.x, this.gyro.z, this.gyro.z);
    console.log("Temperature: %d", this.temperature.celsius);
  });

  // thermometer.on(EVENTS.change, async () => {
  //   const { C, F, K, celsius, fahrenheit, kelvin } = await thermometer;
  //   const ther = {
  //     celsius,
  //     fahrenheit,
  //     kelvin,
  //     C,
  //     F,
  //     K,
  //   };

  //   console.log(ther);
  // });

  // accelerometer.on(EVENTS.change, async () => {
  //   const {
  //     x,
  //     y,
  //     z,
  //     pitch,
  //     roll,
  //     inclination,
  //     orientation,
  //     acceleration,
  //   } = await accelerometer;

  //   const acc = {
  //     x: x,
  //     y: y,
  //     z: z,
  //     roll: roll,
  //     pitch: pitch,
  //     inclination: inclination,
  //     orientation: orientation,
  //     acceleration: acceleration,
  //   };

  //   console.log(acc);
  // });

  // gyro.on(EVENTS.change, async () => {
  //   const {x,y,z,pitch, roll,yaw,rate,isCalibrated}=gyro;
  //   console.log("gyro");
  //   console.log("  x            : ", x);
  //   console.log("  y            : ", y);
  //   console.log("  z            : ", z);
  //   console.log("  pitch        : ", pitch);
  //   console.log("  roll         : ", roll);
  //   console.log("  yaw          : ", yaw);
  //   console.log("  rate         : ", rate);
  //   console.log("  isCalibrated : ", isCalibrated);
  //   console.log("--------------------------------------");
  // });

  //axios.post(URI2,)
});
