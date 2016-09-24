'use strict'

var mraa = null;
var analogPin0 = null; //setup access analog input Analog pin #0 (A0)
var analogValue = 0; //read the value of the analog pin

module.exports = function () {
  setupAnalogPin();
  return getTemperature();
}

function setupAnalogPin() {
  mraa = require('mraa'); //require mraa
  analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
}

function getTemperature() {
  analogValue = analogPin0.read(); //read the value of the analog pin
  return analogValue;
}
