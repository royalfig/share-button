import darkModeStyles from "./dark-mode-styles.css?inline";

export function createDarkModeStyles(el: HTMLElement) {
	let darkMode = el.getAttribute("dark-mode");
	darkMode ??= "auto";

	if (darkMode === "auto") {
		return `@media (prefers-color-scheme: dark) {
			${darkModeStyles}
		}`;
	}

	if (darkMode === "false") {
		return "";
	}

	if (darkMode === "true") {
		return darkModeStyles;
	}
}
