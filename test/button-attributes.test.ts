import { describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Button Attributes", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
  });

  it("has popovertarget attribute when popover is supported", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const el = button as any;
    if (el.isPopoverSupport && !el.isMobile) {
      const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;
      expect(shareButton.getAttribute("popovertarget")).toBe("share-popover");
    }
  });

  it("has aria-label when circle attribute is set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("circle", "");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;
    expect(shareButton.getAttribute("aria-label")).toBe("Share");
  });

  it("has aria-label when notext attribute is set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("notext", "");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;
    expect(shareButton.getAttribute("aria-label")).toBe("Share");
  });

  it("does not have aria-label by default", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;
    expect(shareButton.getAttribute("aria-label")).toBeNull();
  });

  it("has correct part attribute on button", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLElement;
    expect(shareButton.getAttribute("part")).toBe("share-button");
  });

  it("has class 'share-button' on the button element", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button");
    expect(shareButton).not.toBeNull();
    expect(shareButton!.classList.contains("share-button")).toBe(true);
  });
});
