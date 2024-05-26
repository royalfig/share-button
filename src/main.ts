import { createDarkModeStyles } from "./dark-mode";
import { createPopoverContent } from "./popover";
import { copiedIcon, icons } from "./icons";
import style from "./style.css?inline";
import { createUserStyles } from "./user-styles";

export class ShareButton extends HTMLElement {
	isPopoverSupport = Object.prototype.hasOwnProperty.call(
		HTMLElement.prototype,
		"popover",
	);
	isMobile =
		(/android/i.test(navigator.userAgent) ||
			/iPhone|iPad|iPod/i.test(navigator.userAgent)) &&
		navigator.share;
	shadow = this.attachShadow({ mode: "open" });

	static observedAttributes = ["dark-mode"];
	connectedCallback(): void {
		this.render();
	}

	attributeChangedCallback() {
		this.render();
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
		const button = isAtomic ? "" : this.createButton(icon);

		if (!isAtomic && button) {
			button.addEventListener("click", (e) => {
				const target = e.currentTarget as Element;

				// if mobile and share is supported

				if (this.isMobile) {
					try {
						navigator.share({
							title,
							url: window.location.href,
						});
						target.removeAttribute("popover");
					} catch (err) {
						console.log(err);
					}

					return;
				}

				if (this.isPopoverSupport) {
					const buttonCoords = target.getBoundingClientRect();

					let xAdjust = 0;

					if (buttonCoords.left < 100) {
						xAdjust = buttonCoords.width / 2  - 10;
						popover.classList.add("left-adjust");
					}

					if (buttonCoords.right > window.innerWidth - 100) {
						xAdjust = -buttonCoords.width / 2 + 10;
						popover.classList.add("right-adjust");
					}

					const scrollY = window.scrollY;

					popover.style.left = `${
						buttonCoords.left + buttonCoords.width / 2 + xAdjust
					}px`;

					if (document.documentElement.clientHeight / 2 > buttonCoords.y) {
						// PUT below
						popover.style.top = `${
							scrollY + buttonCoords.top + buttonCoords.height
						}px`;
						popover.style.translate = "-50% 0";
						popover.classList.remove("down");
						popover.classList.add("up");
					} else {
						// PUT above
						popover.style.top = `${scrollY + buttonCoords.top}px`;
						popover.style.translate = "-50% -100%";
						popover.classList.remove("up");
						popover.classList.add("down");
					}

					return;
				}

				navigator.clipboard.writeText(window.location.href);
				setTimeout(() => {
					this.textContent = "Copied!";
					this.createButton(copiedIcon);
				}, 1000);
			});
		}

		

		if (!isAtomic) {
		const closePopover = () => {
			const popover = this.shadow.querySelector("[popover]") as HTMLElement;
			popover.hidePopover();
		};



		addEventListener("resize", closePopover);
		addEventListener("scroll", closePopover);
	}
		// dark mode
		const darkModeStyles = createDarkModeStyles(this);

		const wrapper = document.createElement("div");
		wrapper.setAttribute("class", "wrapper");
		wrapper.setAttribute("part", "wrapper");
		const contentEl = this.isPopoverSupport ? popover : "<div></div>";
		wrapper.append(button, contentEl);
		this.shadow.replaceChildren(wrapper);

		const styles = new CSSStyleSheet();
		styles.replaceSync(style + userStyles + darkModeStyles);
		this.shadow.adoptedStyleSheets = [styles];
	}

	private createIcon() {
		const iconChoice = this.getAttribute("icon") || "1";
		let icon;
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

		console.log(this, this.textContent);
		if (this.isPopoverSupport && !this.isMobile) {
			button.setAttribute("popovertarget", "share-popover");
		}

		const isCircle = this.hasAttribute("circle");

		if (isCircle || isNoText) {
			button.setAttribute("aria-label", "Share");
			button.setAttribute("style", "border-radius: 50%; padding: 0.75rem; line-height: 1;");
			button.innerHTML = icon;
		} else {
			
			
				button.innerHTML = `${icon} ${
					this.textContent ? "<slot></slot>" : "Share"
				}`;
			
		}
		return button;
	}

	createPopover(title: string, isAtomic = false) {
		const networks =
			this.getAttribute("networks") ||
			"x, linkedin, facebook, email, whatsapp, telegram, copy";
		const popoverContent = createPopoverContent({
			url: window.location.href,
			title,
			shareText: this.textContent ?? "Share",
			networks,
			isAtomic,
		});
		
		if (!isAtomic) {
			const popover = document.createElement("div");
			popover.setAttribute("id", "share-popover");
			popover.setAttribute("part", "share-popover");
			popover.setAttribute("popover", "");
			popover.append(popoverContent);
			return popover;
		}

		return popoverContent;
	}
}

customElements.define("share-button", ShareButton);
