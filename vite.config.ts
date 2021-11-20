import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		assetsInlineLimit: 0,
	},
	resolve: {
		alias: {
			"@": path.resolve("./src"),
		},
	},
	// optimizeDeps: {
	// 	exclude: ["phaser"],
	// },
	base: "./",
	server: {
		https: {
			key: "./cert/key.pem",
			cert: "./cert/cert.pem",
		},
		host: "0.0.0.0",
	},
});
