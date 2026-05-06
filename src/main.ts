import { createDarkModeStyles } from "./dark-mode";
import { createPopoverContent } from "./popover";
import { icons } from "./icons";
import style from "./style.css?inline";
import { createUserStyles } from "./user-styles";

class ShareButton extends HTMLElement {
	isPopoverSupport = Object.hasOwn(HTMLElement.prototype, "popover");
	isMobile =
		(/android/i.test(navigator.userAgent) ||
			/iPhone|iPad|iPod/i.test(navigator.userAgent)) &&
		navigator.share;
	shadow = this.attachShadow({ mode: "open" });
	state = false;
	private _connected = false;
	private _clickHandler: ((e: Event) => void) | null = null;
	private _resizeHandler: (() => void) | null = null;
	private _scrollHandler: (() => void) | null = null;
	private _stylesheet: CSSStyleSheet | null = null;

	static get observedAttributes() {
		return ["dark-mode"];
	}

	get darkMode(): string | null {
		return this.getAttribute("dark-mode");
	}

	set darkMode(value: string | null) {
		this.setAttribute("dark-mode", value ?? "");
	}

	connectedCallback(): void {
		this._connected = true;
		this.render();
	}

	disconnectedCallback(): void {
		this._connected = false;
		if (this._clickHandler) {
			const button = this.shadow?.querySelector(".share-button");
			button?.removeEventListener("click", this._clickHandler);
			this._clickHandler = null;
		}
		this._resizeHandler && removeEventListener("resize", this._resizeHandler);
		this._scrollHandler && removeEventListener("scroll", this._scrollHandler);
	}

	attributeChangedCallback(
		_attrName: string,
		oldVal: string | null,
		newVal: string | null,
	) {
		if (oldVal === newVal) return;
		if (!this._connected) return;
		this.render();
	}

	private _closePopover() {
		const popover = this.shadow?.querySelector("[popover]") as
			| HTMLElement
			| undefined;
		if (popover?.matches(":popover-open")) {
			popover.hidePopover();
		}
	}

	render() {
		const title =
			document.querySelector("title")?.textContent ||
			document.querySelector("h1")?.textContent ||
			"";

		const userStyles = createUserStyles(this);
		const icon = this.createIcon();
		const isAtomic = this.hasAttribute("atomic");
		const popover = this.createPopover(title, isAtomic);
		const button = isAtomic ? null : this.createButton(icon);

		const darkModeStyles = createDarkModeStyles(this);

		if (!this._stylesheet) {
			this._stylesheet = new CSSStyleSheet();
		}
		this._stylesheet.replaceSync(style + userStyles + darkModeStyles);
		this.shadow.adoptedStyleSheets = [this._stylesheet];

		const wrapper = document.createElement("div");
		wrapper.setAttribute("class", "wrapper");
		wrapper.setAttribute("part", "share-wrapper");

		if (this.isPopoverSupport) {
			wrapper.append(popover);
		} else {
			const fallbackDiv = document.createElement("div");
			wrapper.append(fallbackDiv);
		}

		if (button) {
			wrapper.append(button);
		}

		this.shadow.replaceChildren(wrapper);

		if (!isAtomic && button) {
			const clickHandler = async (e: Event) => {
				const target = e.currentTarget as Element;

				if (this.isMobile) {
					try {
						navigator.share({
							title,
							url: window.location.href,
						});
						this.dispatchEvent(
							new CustomEvent("share-button-share", {
								bubbles: true,
								detail: { network: "native", url: window.location.href },
							}),
						);
						const mobilePopover = this.shadow?.querySelector("[popover]") as
							| HTMLElement
							| undefined;
						mobilePopover?.hidePopover();
					} catch (err) {
						console.log(err);
					}
					return;
				}

				if (this.isPopoverSupport) {
					const popoverClone = popover.cloneNode(true) as HTMLElement;
					popoverClone.removeAttribute("id");
					popoverClone.removeAttribute("popover");
					wrapper.append(popoverClone);
					popoverClone.style.visibility = "hidden";
					popoverClone.style.pointerEvents = "none";
					popoverClone.classList.add("up", "popover-clone");
					const popoverWidth = popoverClone.getBoundingClientRect().width;
					const popoverHeight = popoverClone.getBoundingClientRect().height;
					popoverClone.remove();

					const buttonCoords = target.getBoundingClientRect();
					let left = `${buttonCoords.left + buttonCoords.width / 2 - popoverWidth / 2}px`;

					if (buttonCoords.left < 100) {
						left = `${buttonCoords.left + buttonCoords.width / 2 - popoverWidth * 0.25}px`;
						popover.classList.add("left-adjust");
					}

					if (buttonCoords.right > window.innerWidth - 100) {
						left = `${buttonCoords.left + buttonCoords.width / 2 - popoverWidth * 0.75}px`;
						popover.classList.add("right-adjust");
					}

					const scrollY = window.scrollY;
					popover.style.left = left;

					if (document.documentElement.clientHeight / 2 > buttonCoords.y) {
						popover.style.top = `${scrollY + buttonCoords.top + buttonCoords.height}px`;
						popover.classList.remove("down");
						popover.classList.add("up");
					} else {
						popover.style.top = `${scrollY + buttonCoords.top - popoverHeight}px`;
						popover.classList.remove("up");
						popover.classList.add("down");
					}

					return;
				}

				try {
					await navigator.clipboard.writeText(window.location.href);
					this.dispatchEvent(
						new CustomEvent("share-button-copy", {
							bubbles: true,
							detail: { url: window.location.href },
						}),
					);
					const copySuccessIndicator = document.createElement("span");
					copySuccessIndicator.setAttribute("part", "copy-success");
					copySuccessIndicator.textContent = "Copied!";
					setTimeout(() => {
						copySuccessIndicator.remove();
					}, 1000);
				} catch {
					const copyFailIndicator = document.createElement("span");
					copyFailIndicator.setAttribute("part", "copy-error");
					copyFailIndicator.textContent = "Copy failed";
					copyFailIndicator.style.color = "#e53e3e";
					setTimeout(() => {
						copyFailIndicator.remove();
					}, 2000);
				}
			};

			if (this._clickHandler) {
				button.removeEventListener("click", this._clickHandler);
			}

			this._clickHandler = clickHandler;
			button.addEventListener("click", clickHandler);
		}

		if (!isAtomic) {
			if (!this._resizeHandler) {
				this._resizeHandler = () => this._closePopover();
			}
			if (!this._scrollHandler) {
				this._scrollHandler = () => this._closePopover();
			}

			removeEventListener("resize", this._resizeHandler);
			removeEventListener("scroll", this._scrollHandler);
			addEventListener("resize", this._resizeHandler);
			addEventListener("scroll", this._scrollHandler);
		}
	}

	createIcon() {
		const iconChoice = this.getAttribute("icon") || "1";

		let icon: string;

		if (iconChoice === "false") {
			icon = "";
		} else if (!["1", "2", "3", "4", "5", "6", "7"].includes(iconChoice)) {
			console.log(
				'[Share Button] It looks like you did not specify a valid icon. Please add an icon attribute with a value of "1," "2," "3," "4," "5," "6," or "7"',
			);
			icon = icons["1" as keyof typeof icons];
		} else {
			icon = icons[iconChoice as keyof typeof icons];
		}
		return icon;
	}

	createButton(icon: string) {
		const button = document.createElement("button");
		button.setAttribute("part", "share-button");
		button.setAttribute("class", "share-button");
		const isNoText = this.hasAttribute("notext");

		if (this.isPopoverSupport && !this.isMobile) {
			button.setAttribute("popovertarget", "share-popover");
			button.setAttribute("aria-haspopup", "dialog");
		}

		const isCircle = this.hasAttribute("circle");

		if (isCircle || isNoText) {
			button.setAttribute("aria-label", "Share");
			button.innerHTML = icon;
		} else {
			const slotContent = this.textContent ? "<slot></slot>" : "Share";
			button.innerHTML = `${icon} ${slotContent}`;
		}
		return button;
	}

	createPopover(title: string, isAtomic = false) {
		const networks =
			this.getAttribute("networks") ||
			"x, bluesky, linkedin, facebook, email, whatsapp, telegram, threads, copy";
		const popoverContent = createPopoverContent({
			url: window.location.href,
			title,
			shareText: this.textContent ?? "Share",
			networks,
			isAtomic,
			el: this,
		});

		if (!isAtomic) {
			const popover = document.createElement("div");
			popover.setAttribute("id", "share-popover");
			popover.setAttribute("part", "share-popover");
			popover.setAttribute("popover", "");
			popover.setAttribute("role", "dialog");
			popover.setAttribute("aria-label", "Share this page");
			popover.append(popoverContent);
			return popover;
		}

		return popoverContent;
	}
}

customElements.define("share-button", ShareButton);
export { ShareButton };
