<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
// defineProps<{ msg: string }>();

const downloaded = ref(false);
const showBanner = ref(false);
const showCollide = ref(false);
const gameInstance = ref(null);
const containerId = "game";

const coords = ref({
	a: 0,
	b: 0,
	g: 0,
	x: 0,
	y: 0,
	z: 0,
});

onMounted(async () => {
	if (window.DeviceMotionEvent && typeof window?.DeviceMotionEvent?.requestPermission === "function") {
		DeviceMotionEvent.requestPermission()
			.then((r) => {
				if (r !== "granted") {
					showBanner.value = true;
				}
			})
			.catch((e) => {
				showBanner.value = true;
			});
	}
	load();
	// window.addEventListener("devicemotion", (e) => {
	// 	coords.value = e.accelerationIncludingGravity;
	// })
	// window.addEventListener("deviceorientation", function (e) {
	// 	coords.value = {
	// 		a: e.alpha,
	// 		b: e.beta,
	// 		g: e.gamma,
	// 	};
	// });
});

const load = async () => {
	await import("phaser");
	const game = await import("@/game/game");
	downloaded.value = true;
	gameInstance.value = game.launch(containerId);
	game.emitter.on("COLLIDE", (data) => {
		showCollide.value = true;
	});
	game.emitter.on("DECOLLIDE", (data) => {
		showCollide.value = false;
	});
	game.emitter.on("test", (data) => {
		console.log(data);
	});
};

const getGrants = () => {
	DeviceMotionEvent.requestPermission().then((r) => {
		if (r === "granted") {
			showBanner.value = false;
		}
	});
};

onBeforeUnmount(() => {
	gameInstance.value.destroy(false);
});
</script>

<template>
	<div :id="containerId" class="game">
		<!-- <div class="t">
			<p>{{ coords?.a }}</p>
			<p>{{ coords?.b }}</p>
			<p>{{ coords?.g }}</p> 

			<p>{{ coords?.x }}</p>
			<p>{{ coords?.y }}</p>
			<p>{{ coords?.z }}</p>
		</div> -->
		<div v-if="!downloaded" class="placeholder">L‰oading ...</div>

		<div class="banner" v-if="showBanner" @click="getGrants">
			<p>The game requires permission to use device sensors</p>
			<p>Click on this to allow It</p>
		</div>

		<div class="banner" v-if="showCollide">
			<p>Ahtung!</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.game {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 15px;
	top: 15px;
	bottom: 15px;
	right: 15px;

	:global(canvas) {
		border-radius: 10px;
		box-shadow: 0px 0px 15px #fff;
	}

	@media screen and (orientation: portrait) {
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;

		:global(canvas) {
			border-radius: 0;
			box-shadow: none;
		}
	}
}

.t {
	position: absolute;
	top: 10px;
	z-index: 999;
	color: #fff;
}

.placeholder {
	font-size: 2rem;
	font-family: "Courier New", Courier, monospace;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 500px;
	color: #fff;
}

.banner {
	z-index: 100;
	position: absolute;
	width: 100%;
	bottom: 0;
	background-color: #000;
	color: #fff;
	padding: 10px;
}
</style>
