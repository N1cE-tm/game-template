import Phaser from "phaser";
import Emitter from "@/game/utils/emitter";
import Player from "@/game/player";

export default class PlayScene extends Phaser.Scene {
	constructor() {
		super({ key: "PlayScene" });
	}

	create() {
		this.emitter = Emitter.getInstance();

		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("ts", "base_tiles");
		const ground = map.createLayer("background", tileset);
		const walls = map.createLayer("walls", tileset);

		this.player = new Player(this, 23, 23);

		walls.setCollisionByProperty({ collides: true });
		this.physics.world.addCollider(this.player.sprite, walls, () => {
			this.player.stop();
		});

		// Camera setup
		this.cameras.main.startFollow(this.player.sprite);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}

	update() {
		this.player.update();
	}
}
