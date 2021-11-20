import Phaser from "phaser";

const Keyboard = Phaser.Input.Keyboard.KeyCodes;

export default class Player {
	constructor(scene, x = 0, y = 0, options = {}) {
		this.scene = scene;
		this.params = {
			speed: 4000,
			swipeVelocityThreshold: 200,
			maxVelocity: 900,
			...options,
		};
		this.isWalking = false;

		this.sprite = scene.physics.add
			.sprite(x, y, "bomb", 0)
			.setDrag(1000, 0)
			.setMaxVelocity(this.params.maxVelocity, this.params.maxVelocity);

		if (this.params?.size) this.sprite.setSize(this.params.size);

		this.keyboard = scene.input.keyboard;
		this.swipe = scene.gestures.add.swipe({ velocityThreshold: this.params.swipeVelocityThreshold });

		this.keyboard.on("keydown", this.handleKeyPress.bind(this));
		this.swipe.on("swipe", this.handleSwipe.bind(this), scene);
	}

	handleSwipe(swipe) {
		if (swipe.left) {
			this.move(Phaser.LEFT);
		}
		if (swipe.right) {
			this.move(Phaser.RIGHT);
		}
		if (swipe.up) {
			this.move(Phaser.UP);
		}
		if (swipe.down) {
			this.move(Phaser.DOWN);
		}
	}

	handleKeyPress(e) {
		switch (e.keyCode) {
			case Keyboard.W:
			case Keyboard.UP:
				this.move(Phaser.UP);
				break;
			case Keyboard.A:
			case Keyboard.LEFT:
				this.move(Phaser.LEFT);
				break;
			case Keyboard.S:
			case Keyboard.DOWN:
				this.move(Phaser.DOWN);
				break;
			case Keyboard.D:
			case Keyboard.RIGHT:
				this.move(Phaser.RIGHT);
				break;
			default:
				break;
		}
	}

	move(direction) {
		if (this.isWalking) return;
		const speed = this.params.speed;

		switch (direction) {
			case Phaser.LEFT:
				this.sprite.setAccelerationX(-speed);
				break;
			case Phaser.RIGHT:
				this.sprite.setAccelerationX(speed);
				break;
			case Phaser.UP:
				this.sprite.setAccelerationY(-speed);
				break;
			case Phaser.DOWN:
				this.sprite.setAccelerationY(speed);
				break;
			default:
				break;
		}
		this.isWalking = true;
	}

	stop() {
		this.sprite.setAcceleration(0, 0);
		this.isWalking = false;
	}

	update() {}

	destroy() {
		this.sprite.destroy();
	}
}
