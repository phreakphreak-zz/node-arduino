"use strict";

//Settings
const { URI, KEY_SECRET, EVENTS } = require("./config");
const { Device } = require("./Device");
const axios = require("axios").default;
const board = require("./board");
const {pedometer,options} = require("./stepper");

const mac_address = "84:0D:8E:A3:B1:EA";

board.samplingInterval(1000);
board.on(EVENTS.ready, () => {
  // axios
  //   .post(URI, {
  //     numberSerie: 123456,
  //     tokenDevice: "",
  //     macAdress: mac_address,
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  //Device.obtainMac(networkInterfaces);

  //const steps=pedometer(data.acc,data.att,100,options);
  //console.log("The algorithm detected "+steps.length+" steps.");
//variables
  const data = {};
  const thermometer = require("./thermometer");
  const accelerometer = require("./accelerometer");
  const gyro = require("./gyro");
  
  const count = 0;

  
  const d1=[];
  const d2=[];
  
  // setInterval(async () => {
  // //console.log(d1,d2);
  // const steps=  await pedometer(d1,d2,100,options);
  // console.log("The algorithm detected "+steps.length+" steps.");
  // }, 1000);

  thermometer.on(EVENTS.change, async () => {
    const { C,F,K,celsius,fahrenheit,kelvin } = await thermometer;
    data.thermometer = {
      celsius: celsius,
      fahrenheit: fahrenheit,
      kelvin: kelvin,
      C:C,
      F:F,
      K,
    };
  });

  
  accelerometer.on(EVENTS.change, async () =>{
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
     d1.push([x,y,z]);
  console.log(data);
  });
  gyro.on(EVENTS.change, async ()=>{
    
    const {pitch,roll,yaw} = await gyro;
    
    d2.push([pitch.rate, roll.rate,yaw.rate]);
    //console.log(d1,d2);
  
  });
  

  setInterval( () => {
  //console.log(d1,d2);
  const steps=   pedometer(d1,d2,100,options);
  console.log("The algorithm detected "+steps.length+" steps.");
  }, 2000);

  
});
