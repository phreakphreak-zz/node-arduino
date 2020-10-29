const { EtherPortClient } = require("etherport-client");
const { Board } = require("johnny-five");
const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.11",
    port: 3030,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});

module.exports = board;
