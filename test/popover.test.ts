import { describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Popover", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
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

  it("atomic mode renders without crashing", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("atomic", "");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
  });

  it("component renders without popover support", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }
  });

  it("button element exists in non-popover mode", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const el = button as any;
    if (!el.isPopoverSupport) {
      const shareButton = button.shadowRoot!.querySelector(".share-button");
      expect(shareButton).not.toBeNull();
    }
  });

  it("shadow DOM has structure in all modes", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("atomic", "");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.classList.contains("wrapper")).toBe(true);
  });

  it("renders without errors in fallback mode", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("circle", "");
    document.body.appendChild(button);
    const el = button as any;
    if (!el.isPopoverSupport) {
      const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;
      expect(shareButton.getAttribute("aria-label")).toBe("Share");
    }
  });
});
