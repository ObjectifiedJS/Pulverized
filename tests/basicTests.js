'use strict';

var assert = require("assert"),
	fs = require("fs"),
	loremText = fs.readFileSync('./tests/lorem.txt',"utf8"),
	pulverized = require("../index"),
	publicMethodCounted = 0,
	publicMethodCountExists = 18,
	pulverizedDataActionInstance,
	pulverizedCompressionMethodInstance,
	pulverizedDataHandlingMethodInstance;

assert.strictEqual(typeof pulverized, "object", "Pulverized should come back as an object.");

for(var dataAction in pulverized){
	pulverizedDataActionInstance = pulverized[dataAction];
	// console.log(dataAction);
	for(var compressionMethod in pulverizedDataActionInstance){
		pulverizedCompressionMethodInstance = pulverizedDataActionInstance[compressionMethod];
		// console.log(compressionMethod);
		for(var dataHandlingMethod in pulverizedCompressionMethodInstance){
			pulverizedDataHandlingMethodInstance = pulverizedCompressionMethodInstance[dataHandlingMethod];
			publicMethodCounted++;
			// should think of a way to test each method basically...
			console.log(dataAction,compressionMethod,dataHandlingMethod);
		}
	}
}

assert.strictEqual(publicMethodCounted, publicMethodCountExists, "We have counted "+publicMethodCounted+" public methods... Pulverized should have "+publicMethodCountExists+" public methods.");
