'use strict'

const Thing = require('metemq-thing-js').Thing;
const thing = new Thing('demo_thing', {
    //username: 'user',
    //password: 'secret',
    url: 'mqtt://metemq.com'
});

const temp = thing.bind('temperature');
const tempGetter = require('./TempGetter');

let step = 1000;
let interval;
var val = 0;

function start_binding() {
	interval = setInterval(function() {
		// val = tempGetter();
		temp.set(val);
		console.log(val); //TODO delete
	}, step);
}

function stop_binding() {
	clearInterval(interval);
	interval = null;
}

start_binding();
