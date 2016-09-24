'use strict'

var mraa = null;

exports.digital = function (pinNumber) {
  if (mraa == null) {
      mraa = require('mraa');
  }

  var ret = {
    pinNumber : pinNumber,
    pin : new mraa.Gpio(pinNumber),
    read : function () {
      return this.pin.read();
    }
  };

  return ret;
}

exports.analog = function (pinNumber) {
  if (mraa == null) {
      mraa = require('mraa');
  }

  var ret = {
    pinNumber : pinNumber,
    pin : new mraa.Aio(pinNumber),
    read : function () {
      return this.pin.read();
    }
  };

  return ret;
}
