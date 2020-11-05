const {HOST,PORT} = require("./config")
const { EtherPortClient } = require("etherport-client");
const { Board } = require("johnny-five");
const board = new Board({
  port: new EtherPortClient({
    host: HOST,
    port: PORT,
    baudrate: 9600,
    buffersize: 1,
  }),
  repl: false,
});

module.exports = board;
