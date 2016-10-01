"use strict";

(function() {
	var Thing = require('metemq-thing-js').Thing;
	var thing = new Thing('metemq-demo-edison', {
		//username: 'user',
		//password: 'secret',
		url: 'mqtt://metemq.com'
	});

	// binding values to the thing
	var temperBind = thing.bind('temperature'),
		buttonBind = thing.bind('button');

	// module for accessing sensors
	var pinAccessor = require('./pinAccessor'),
		temperPin = pinAccessor.analog(0),
		buttonPin = pinAccessor.digital(2);

	var temperValue = 0,
		buttonValue = false;

	// interval for measure temperature
	var temperStep = 1000, //ms
		temperInterval = null;

	// minimum gap for button
	var buttonGap = 200, //ms
		buttonGapTimeout = null;


	function start_binding() {

		// interrupt service routine for button
		function serviceRoutine() {
			if (buttonGapTimeout != null) return;

			buttonGapTimeout = setTimeout(function() {
				buttonGapTimeout = null;
			}, buttonGap);

			buttonValue = (buttonValue)? false : true;
			buttonBind.set(buttonValue);

			console.log("button: " + buttonValue);
		}
		
		buttonPin.isr(serviceRoutine); // Assign the ISR function to the button push

		// start to measure temperature
		temperInterval = setInterval(function() {
			temperValue = temperPin.read() * 500 / 1024;
			temperBind.set(temperValue);
			console.log("temperature: " + temperValue);

		}, temperStep);
	}

	function stop_binding() {
		buttonPin.isrExit();

		clearInterval(temperInterval);
		temperInterval = null;
	}


	start_binding();

})()
