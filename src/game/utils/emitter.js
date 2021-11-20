import Phaser from "phaser";

let instance;

export default class Emitter extends Phaser.Events.EventEmitter {
	constructor() {
		super();
	}

	static getInstance() {
		if (!instance) {
			instance = new Emitter();
		}
		return instance;
	}
}
