'use strict'

var mraa = null;

exports.digital = function (pinNumber) {
  if (mraa == null) {
      mraa = require('mraa');
  }

  var ret = {
    pinNumber : pinNumber,
    pin : new mraa.Gpio(pinNumber),
    direction : null,
    
    read : function () {
      return this.pin.read();
    },
    isr : function (serviceRoutine) {
      if (this.direction == null) {
        this.direction = mraa.DIR_IN;
        buttonPin.dir(this.direction);
      }
      this.pin.isr(mraa.EDGE_FALLING, serviceRoutine);
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
