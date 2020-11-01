const axios = require("axios").default;

class Device {
  constructor(tokenDevice, deviceId, macAddress) {
    this.tokenDevice = tokenDevice;
    this.deviceId = deviceId;
    this.macAddress = macAddress;
  }

  get getTokenDevice() {
    return this.tokenDevice;
  }
  set setTokenDevice(token) {
    this.tokenDevice = token;
  }

  get getDeviceId() {
    return this.getDeviceId;
  }
  set setDeviceId(id) {
    this.deviceId = id;
  }

  get getMacAddress() {
    return this.macAddress;
  }
  set setMacAddress(mac) {
    this.macAddress = mac;
  }

  obtainMac(networkInterfaces) {
    const mac = [];
    for (const interfaces in networkInterfaces) {
      obj[interfaces].map((address) => {
        mac.push({
          interface: interfaces,
          mac: address.mac,
          family: address.family,
        });
      });
    }

    const filterMac = mac.filter((element) =>
      element.family.startsWith("IPv4")
    );
    return filterMac;
  }
}
