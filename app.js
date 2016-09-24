"use strict"

var Thing = require('metemq-thing-js').Thing;
var thing = new Thing('demo_thing', {
    //username: 'user',
    //password: 'secret',
    url: 'mqtt://metemq.com'
});
var temp = thing.bind('temperature');

var pinAccessor = require('./pinAccessor');
var temperPin = pinAccessor.analog(0);
var buttonPin = pinAccessor.digital(2);

var temperValue = 0;

var step = 1000; //ms
var interval;

function start_binding() {
	interval = setInterval(function() {
		temperValue = temperPin.read();
		temp.set(temperValue);
		console.log(temperValue);

	}, step);
}

function stop_binding() {
	clearInterval(interval);
	interval = null;
}

start_binding();





// Set up digital input on MRAA pin 36 (GP14)
buttonPin.dir(mraa.DIR_IN);

// Global counter
var num = 0;

// Our interrupt service routine
function serviceRoutine() {
    num++;
    console.log("BOOP " + num);
}

// Assign the ISR function to the button push
buttonPin.isr(mraa.EDGE_FALLING, serviceRoutine);
