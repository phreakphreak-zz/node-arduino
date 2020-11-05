const config = {
  URI1: "http://192.168.0.12:3000/api/devices",
  URI2:"http://192.168.0.12:3000/api/thermometer",
  URI3:"http://192.168.0.12:3000/api/accelerometer",
  KEY_SECRET: "proyectoempresarial",
  HOST:"192.168.0.8",
  PORT:3030,
  EVENTS: {
    ready: "ready",
    change: "change",
    data: "data",
    connect: "connect",
  },
};
module.exports = config;
