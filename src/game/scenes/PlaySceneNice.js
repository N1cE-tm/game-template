import Phaser from "phaser";
import Player from "@/game/player";

import tiles from "@/game/assets/tiles/ass.png";
import coin from "@/game/assets/tiles/coin.png";
import tilesMap from "@/game/assets/tiles/space2.json";

import Base from "@/game/scenes/Base";

export default class PlayScene extends Base {
	constructor() {
		super({ key: "PlayScene" });
	}

	preload() {
		this.loading();

		this.load.image("tiles", tiles);
		this.load.image("coin", coin);
		this.load.tilemapTiledJSON("tilemap", tilesMap);
	}

	create() {
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("ass", "tiles");
		const ground = map.createLayer("bg", tileset);
		const walls = map.createLayer("walls", tileset);
		// const coins = map.createLayer("coins", tileset);

		const dotsLayer = map.createLayer("coins", tileset);
		const dots = dotsLayer.createFromTiles(21, 0, {
			key: "coin",
			origin: 0,
		});
		dots.forEach((dot) => {
			dot.setSize(16, 16);
			this.physics.add.existing(dot);
		});

		this.player = new Player(this, 23, 23);

		walls.setCollisionByProperty({ collides: true });
		dotsLayer.setCollisionByProperty({ collides: true });

		this.physics.world.addCollider(this.player.sprite, walls, () => {
			this.player.stop();
		});

		this.physics.add.overlap(this.player.sprite, dots, (player, coin) => {
			coin.destroy(true);
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
