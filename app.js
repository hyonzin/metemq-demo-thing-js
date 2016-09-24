"use strict"

var Thing = require('metemq-thing-js').Thing;
var thing = new Thing('demo_thing', {
    //username: 'user',
    //password: 'secret',
    url: 'mqtt://metemq.com'
});
var temp = thing.bind('temperature');

var tempGetter = require('./TempGetter');

var step = 1000;
var interval;
var val = 0;

function start_binding() {
	interval = setInterval(function() {
		val = tempGetter();
		temp.set(val);
		console.log(val); //TODO delete
	}, step);
}

function stop_binding() {
	clearInterval(interval);
	interval = null;
}

start_binding();

