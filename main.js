"use strict";

/*
 * Created with @iobroker/create-adapter v1.26.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");


// Load your modules here, e.g.:
// const fs = require("fs");

const can = require("socketcan");
const { outputJSON } = require("fs-extra");
// const { parse } = require("path");

let channel = can.createRawChannel("can0", true);

class Smartdeskio extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "smartdeskio",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}


	async onReady() {
		// Initialize your adapter here
		channel.start();
		this.log.info("Der Bratan leauft");
		const newLocal = "onMessage";
		channel.addListener(newLocal, async (msg) => { 
		var firstByte = parseInt(Array.from(msg.data)[0]);
		
		const bufl = Buffer.from(msg.data);
		let jsons = bufl.toJSON();



	this.createStateAndSubscribe(String(msg.id),firstByte,"Ordner für ID","String");

	await this.setStateAsync(this.inputState(String(msg.id),firstByte), { val: jsons["data"], ack: true });


			
	} );
	}
	inputState = function(a,b){
		return a+"."+b;
	}
	createStateAndSubscribe = function(channel1,key,nameOfChannel,nameOfState){
		this.createChannel(channel1,nameOfChannel);
		var sub = this.createState(channel1,key,nameOfState);
		this.subscribeStates(sub);
	}
	createState = function(channel1,key,nameOfState){
		var fullStateName = channel1+"."+key;   
		this.log.info(fullStateName);
		this.setObjectNotExists(fullStateName, {	
			type: "state",
			common: {
				name: nameOfState,
				type: "boolean",
				role: "value",
				read: true,
				write: true,
			},
			native: {},
		});
		return fullStateName;
	}

	createChannel = function(channel1,nameOfChannel){
		this.setObjectNotExists(channel1, {	
		type: "channel",
		common: {
			name: nameOfChannel,
			type: "boolean",
			role: "info",
			read: true,
			write: true,
		},
		native: {},
	});
	}
	

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (e) {
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.message" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

}

// @ts-ignore parent is a valid property on module
if (module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Smartdeskio(options);
} else {
	// otherwise start the instance directly
	new Smartdeskio();
}





