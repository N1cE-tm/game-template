/**
 * Libs
 */
import Phaser from "phaser";

/**
 * Plugins
 */
// import MatterCollisionPlugin from "phaser-matter-collision-plugin";
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin";

/**
 * Screens
 */
import { Boot, PlayScene, MainMenu } from "@/game/scenes";

/**
 * Utils
 */
import Emitter from "@/game/utils/emitter";

/**
 * Init Emitter
 */
const emitter = Emitter.getInstance();

/**
 * Game Config
 */
const config = {
	// type: Phaser.AUTO,
	type: Phaser.CANVAS,
	scale: {
		mode: Phaser.Scale.FIT,
		width: 16 * 17,
		height: 16 * 28,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
			// debug: true,
		},
	},
	plugins: {
		scene: [
			{
				key: "gestures",
				plugin: GesturesPlugin,
				mapping: "gestures",
			},
		],
	},
	scene: [Boot, PlayScene, MainMenu],
};

/**
 * Init Game
 * @param {HTMLElement|string|null} containerId
 * @returns `Phaser.Game` Instance
 */
const launch = (containerId) => {
	return new Phaser.Game({
		parent: containerId,
		...config,
	});
};

export default launch;
export { launch, emitter };
