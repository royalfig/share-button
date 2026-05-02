import { describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Shadow DOM Structure", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
  });

  it("has a shadow root attached after connectedCallback", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    expect(button.shadowRoot).not.toBeNull();
  });

  it("contains a wrapper div in shadow DOM", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.getAttribute("part")).toBe("share-wrapper");
  });

  it("has adoptedStyleSheets with styles", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    expect(button.shadowRoot!.adoptedStyleSheets.length).toBeGreaterThan(0);
  });

  it("renders a button element when not atomic", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button");
    expect(shareButton).not.toBeNull();
    expect(shareButton!.tagName).toBe("BUTTON");
  });

  it("does not render a button in atomic mode", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("atomic", "");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button");
    expect(shareButton).toBeNull();
  });

  it("renders fallback div when popover not supported", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("atomic", "");
    document.body.appendChild(button);
    const el = button as any;
    if (!el.isPopoverSupport) {
      const fallback = button.shadowRoot!.querySelector(".wrapper > div:not(.popover-inner):not(.social-media-container)");
      expect(fallback).not.toBeNull();
    }
  });

  it("renders 'Share' text when no textContent", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as any;
    expect(shareButton.textContent).toContain("Share");
  });

  it("has correct part attribute on wrapper", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper") as HTMLElement;
    expect(wrapper.getAttribute("part")).toBe("share-wrapper");
  });

  it("button has part 'share-button'", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLElement;
    expect(shareButton.getAttribute("part")).toBe("share-button");
  });
});
