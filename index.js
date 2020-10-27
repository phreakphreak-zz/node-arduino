'use strict';

const {
  EtherPortClient
} = require('etherport-client');

//"reset":"firmata-party uno --debug",
const { Accelerometer, Board,Thermometer } = require("johnny-five");
const board = new Board({
  port: new EtherPortClient({
    host: '192.168.0.11',
    port: 3030
  }),
  repl: false
});

board.on("ready", () => {

  const thermometer = new Thermometer({
    controller: "LM35",
    pin:"A0"
  });
  thermometer.on("change", () => {
    const {celsius, fahrenheit, kelvin} = thermometer;
    console.log("Thermometer");
    console.log("  celsius      : ", celsius/2);
    console.log("  fahrenheit   : ", fahrenheit);
    console.log("  kelvin       : ", kelvin);
    console.log("--------------------------------------");
  });

  // const accelerometer = new Accelerometer({
  //   controller: "MPU6050",
  // });

  // accelerometer.on("change", () => {
  //   const {
  //     acceleration,
  //     inclination,
  //     orientation,
  //     pitch,
  //     roll,
  //     x,
  //     y,
  //     z,
  //   } = accelerometer;

  //       console.log("Accelerometer:");
  //       console.log("  x            : ", x);
  //       console.log("  y            : ", y);
  //       console.log("  z            : ", z);
  //       console.log("  pitch        : ", pitch);
  //       console.log("  roll         : ", roll);
  //       console.log("  acceleration : ", acceleration);
  //       console.log("  inclination  : ", inclination);
  //       console.log("  orientation  : ", orientation);
  //       console.log(new Date());
  //       console.log("--------------------------------------");
    


  // });


});
