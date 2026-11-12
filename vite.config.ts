// vite config to build web component
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/main.ts",
			name: "share-button",
			fileName: (format) => `share-button.${format}.js`,
		},
	},
});
