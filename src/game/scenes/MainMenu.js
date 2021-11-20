import Phaser from "phaser";
import Base from "@/game/scenes/Base";

export default class MainMenu extends Base {
	constructor() {
		super({ key: "MainMenu" });
	}

	init(data) {
		this.level = data;
		console.log('init', data);
	}

	preload() {
		console.log('preload', this.level);
	}

	create() {
		this.physics.add
			.image(100, 300, "bomb")
			.setInteractive()
			.on("pointerdown", () => {
				this.scene.start("PlayScene");
			});
	}

	update() {}
}
