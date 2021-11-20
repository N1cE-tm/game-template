import Phaser from "phaser";
import Player from "@/game/player";

import tiles from "@/game/assets/tiles/tiles.png";
import tilesMap from "@/game/assets/tiles/tm.json";
import bigimg from "@/game/assets/bigimg.png";

import Base from "@/game/scenes/Base";

export default class PlayScene extends Base {
	constructor() {
		super({ key: "PlayScene" });
	}

	preload() {
		this.loading();

		this.load.image("base_tiles", tiles);
		this.load.image("big", bigimg);
		// for (let i = 1; i < 100; i++) {
		// 	this.load.image("big" + i, bigimg);
		// }
		this.load.tilemapTiledJSON("tilemap", tilesMap);
	}

	create() {
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
		// this.cameras.main.setRoundPixels(true);
		this.cameras.main.startFollow(this.player.sprite);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	}

	update() {
		this.player.update();
	}
}
