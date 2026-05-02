import { describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Icon Configuration", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
  });

  it("defaults to icon '1' when no icon attribute", () => {
    const el = document.createElement("share-button") as any;
    const icon = el.createIcon();
    expect(icon).toContain("viewBox");
  });

  it('respects icon="2" attribute', () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("icon", "2");
    document.body.appendChild(button);
    const el = button as any;
    const icon = el.createIcon();
    expect(icon).toContain("viewBox");
  });

  it("supports all valid icon values 1-7", () => {
    for (let i = 1; i <= 7; i++) {
      const el = document.createElement("share-button") as any;
      const icon = el.createIcon();
      expect(icon).toContain("viewBox");
    }
  });

  it('returns empty string when icon="false"', () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("icon", "false");
    document.body.appendChild(button);
    const el = button as any;
    const icon = el.createIcon();
    expect(icon).toBe("");
  });

  it('falls back to icon "1" for invalid icon value', () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("icon", "99");
    document.body.appendChild(button);
    const el = button as any;
    const icon = el.createIcon();
    expect(icon).toContain("viewBox");
  });

  it("button contains SVG when icon is set", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as any;
    const svg = shareButton.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("button has no SVG when icon='false' set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("icon", "false");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as any;
    const svg = shareButton.querySelector("svg");
    expect(svg).toBeNull();
  });
});
