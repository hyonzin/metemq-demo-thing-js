"use strict"

var Thing = require('metemq-thing-js').Thing;
var thing = new Thing('demo_thing', {
    //username: 'user',
    //password: 'secret',
    url: 'mqtt://metemq.com'
});
var temp = thing.bind('temperature');

var pinAccess = require('./pinAccess');

var step = 1000;
var interval;

var temperSensor = pinAccess.analog(0);
var buttonSensor = pinAccess.digital(2);

var temperValue = 0;
var buttonValue = 0;

function start_binding() {
	interval = setInterval(function() {

		temperValue = temperSensor.read();
		buttonValue = buttonSensor.read();

		temp.set(temperValue);

		console.log(temperValue);
		console.log(buttonValue);

	}, step);
}

function stop_binding() {
	clearInterval(interval);
	interval = null;
}

start_binding();
