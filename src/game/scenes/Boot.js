import Phaser from "phaser";
import background from "@/game/assets/background.png";
// import wall from "@/game/assets/wall.png";
import bomb from "@/game/assets/bomb.png";
// import thudMp3 from "@/game/assets/thud.mp3";
// import thudOgg from "@/game/assets/thud.ogg";

// import tiles from "@/game/assets/tiles/tiles.png";
// import tilesMap from "@/game/assets/tiles/tm.json";

// import space from "@/game/assets/tiles/space.png";
// import spaceMap from "@/game/assets/tiles/space.json";

import Base from "@/game/scenes/Base";

export default class Boot extends Base {
	constructor() {
		super({ key: "Boot" });
	}

	preload() {
		this.loading(); // Потом заменить на стартовый лоадер

		this.load.image("background", background);
		// this.load.image("wall", wall);
		this.load.image("bomb", bomb);
		// this.load.audio("thud", [thudMp3, thudOgg]);

		// this.load.image("base_tiles", tiles);
		// this.load.tilemapTiledJSON("tilemap", tilesMap);

		// this.load.image("space", space);
		// this.load.tilemapTiledJSON("spacemap", spaceMap);
	}

	create() {
		this.emitter.emit("test", "Boot Loaded");
		this.scene.start("MainMenu", {
			test: 1,
		});

		this.scene.stop();
	}
}
