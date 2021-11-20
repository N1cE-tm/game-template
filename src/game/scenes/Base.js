import Phaser from "phaser";
import Emitter from "@/game/utils/emitter";

export default class Base extends Phaser.Scene {
	emitter = Emitter.getInstance();

	loading() {
		const width = this.cameras.main.width;
		const height = this.cameras.main.height;
		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: "Loading...",
			style: {
				font: "20px monospace",
				fill: "#ffffff",
			},
		});
		loadingText.setOrigin(0.5, 0.5);

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(5, height / 2 - 20, width - 10, 40);

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2,
			text: "0%",
			style: {
				font: "18px monospace",
				fill: "#ffffff",
			},
		});
		percentText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: "",
			style: {
				font: "18px monospace",
				fill: "#ffffff",
			},
		});
		assetText.setOrigin(0.5, 0.5);

		this.load.on("progress", (value) => {
			percentText.setText(parseInt(value * 100) + "%");
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(10, height / 2 - 15, (width - 20) * value, 30);

			// progressBar.fillRect(250, 280, 300 * value, 30);
		});

		this.load.on("fileprogress", (file) => {
			assetText.setText("Loading asset: " + file.key);
		});
		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}
}
