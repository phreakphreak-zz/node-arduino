// "use strict";
// const { URI1, URI2, URI3, EVENTS } = require("./config");
// const axios = require("axios").default;
// const {
//   board,
//   gyro,
//   accelerometer,
//   thermometer,
//   device,
// } = require("./components");

// board.samplingInterval(1000);
// board.on(EVENTS.ready, async () => {
//   //const { data } = await axios.post(URI1, device);

//   //device.deviceId = data.deviceId;
//   //board.id = data.deviceId;
//   thermometer.on(EVENTS.change, async () => {
//     const { C, F, K } = await thermometer;
//   });
//   accelerometer.on(EVENTS.change, async () => {
//     const {
//       x,
//       y,
//       z,
//       pitch,
//       roll,
//       inclination,
//       orientation,
//       acceleration,
//     } = await accelerometer;
//   });
//   gyro.on(EVENTS.change, async () => {
//     const { x, y, z, pitch, roll, yaw, rate, isCalibrated } = await gyro;
//   });
// });

const { EtherPortClient } = require("etherport-client");
const { Board, Accelerometer, Thermometer } = require("johnny-five");

const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.8",
    port: 3030,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});

board.on("ready", () => {
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A0",
  });

  const accelerometer = new Accelerometer({
    controller: "MPU6050",
    sensitivity: 4096,
  });

  thermometer.on("change", async () => {
    const { celsius } = await thermometer;
    console.log("celsius:", celsius);
  });

  accelerometer.on("change", async () => {
    const { x, y, z, acceleration } = await accelerometer;
    console.log("accelerometer:", x, y, z, acceleration);
  });
});
