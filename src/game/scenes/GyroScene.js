import Phaser from "phaser";
import Emitter from "@/game/utils/emitter";

export default class GyroScene extends Phaser.Scene {
	constructor() {
		super({ key: "GyroScene" });
	}

	create() {
		this.emitter = Emitter.getInstance();
		this.sound.add("thud");

		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("ts", "base_tiles");
		const ground = map.createLayer("background", tileset);
		const walls = map.createLayer("walls", tileset);

		walls.setCollisionByProperty({ collides: true });
		this.matter.world.convertTilemapLayer(walls);

		const ball = this.matter.add.image(25, 40, "bomb", false, {
			frictionStatic: 0,
			frictionAir: 0.4,
			friction: 0.1,
			shape: "circle",
		});
		// ball.setCollideWorldBounds(true);
		ball.setBounce(0.1);

		// this.matterCollision.addOnCollideStart({
		// 	objectA: this.ball,
		// 	objectB: walls,
		// 	callback: ({ gameObjectA, gameObjectB }) => {
		// 		// gameObjectA.play("angry", false); // gameObjectA will always match the given "objectA"
		// 		// gameObjectB.play("love", false); // gameObjectB will always match the given "objectB"
		// 	},
		// });
		this.matter.overlap(ball.body, walls.body);

		this.initGyro(ball);
	}

	initGyro(object) {
		// window.addEventListener(
		// 	"deviceorientation",
		// 	(event) => {
		// 		// if (event.gamma) {
		// 		const { gamma, beta } = event;
		// 		const x = gamma > 50 ? 50 : gamma < -50 ? -50 : gamma;
		// 		const y = beta > 50 ? 50 : beta < -50 ? -50 : beta;
		// 		this.bomb.setVelocity(x * 6, y * 6);
		// 		// }

		// 		// console.log(deviceorientation);
		// 	},
		// 	true
		// );

		window.addEventListener(
			"devicemotion",
			(event) => {
				if (event.accelerationIncludingGravity) {
					let { x, y } = event.accelerationIncludingGravity;

					// object.body.velocity.add({ x, y: -y });
					// object.setVelocity(x / 2, -y / 2);
					const limit = 5;

					if (x > limit) x = limit;
					if (x < -limit) x = -limit;
					if (y > limit) y = limit;
					if (y < -limit) y = -limit;

					// object.applyForce({ x: object.body.velocity.x + x, y: object.body.velocity.y - y });
					object.setVelocity(object.body.velocity.x + x, object.body.velocity.y - y);
				}
			},
			true
		);
	}

	update() {
		// this.bg.tilePosition.x += 1;
		// this.physics.world.collide(this.bomb, this.walls, () => {
		// if (this.soundTimeDelay > 2) {
		// 	this.sound.play("thud", { volume: 0.1 });
		// }
		// this.soundTimeDelay = (this.game.time.now - this.soundTimeDelay) / 1000;
		// });
		// this.physics.world.collide(this.bomb, this.walls, () => {
		// 	clearTimeout(this.timeout);
		// 	this.emitter.emit("COLLIDE", { weapon: "sword", strength: 5, monster: "dragon" });
		// 	this.timeout = setTimeout(
		// 		(_this) => {
		// 			_this.emitter.emit("DECOLLIDE", true);
		// 			clearTimeout(_this.timeout);
		// 		},
		// 		500,
		// 		this
		// 	);
		// });
	}
}
