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
	type : "digital",
    
    read : function () {
      return this.pin.read();
    },
    isr : function (serviceRoutine) {
      if (this.direction == null) {
        this.direction = mraa.DIR_IN;
        this.pin.dir(this.direction);
      }
      this.pin.isr(mraa.EDGE_FALLING, serviceRoutine);
    },
    isrExit : function () {
      this.pin.direction = null;
      this.pin.isrExit();
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
	type : "analog",

    read : function () {
      return this.pin.read();
    }
  };

  return ret;
}
