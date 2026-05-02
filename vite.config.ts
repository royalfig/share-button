// vite config to build web component
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	build: {
		lib: {
			entry: "src/main.ts",
			name: "share-button",
			fileName: (format) => `share-button.${format}.js`,
		},
	},
	plugins: [dts()],
});
