const config = {
  BASE: "https://192.168.0.12:3000/api",
  URI1: `${this.BASE}/devices`,
  URI2: `${this.BASE}/thermometer`,
  URI3: `${this.BASE}/accelerometer`,
  KEY_SECRET: "proyectoempresarial",
  HOST: "192.168.0.8",
  PORT: 3030,
  EVENTS: {
    ready: "ready",
    change: "change",
    data: "data",
    connect: "connect",
  },
};
module.exports = config;
