import { describe, expect, it } from "vitest";
import { ShareButton } from "../src/main";

describe("ShareButton - Component Registration", () => {
  it("registers as a custom element under 'share-button'", () => {
    const el = document.createElement("share-button");
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it("can be queried from DOM after appending", () => {
    const el = document.createElement("share-button");
    document.body.appendChild(el);
    const queried = document.querySelector("share-button");
    expect(queried).toBe(el);
    el.remove();
  });

  it("has open shadow root mode", () => {
    const el = document.createElement("share-button") as any;
    document.body.appendChild(el);
    expect(el.shadowRoot!.mode).toBe("open");
    el.remove();
  });

  it("has isPopoverSupport property (boolean)", () => {
    const el = document.createElement("share-button") as any;
    expect(typeof el.isPopoverSupport).toBe("boolean");
  });

  it("has isMobile property (boolean)", () => {
    const el = document.createElement("share-button") as any;
    expect(typeof el.isMobile).toBe("boolean");
  });

  it("has initial state of false", () => {
    const el = document.createElement("share-button") as any;
    expect(el.state).toBe(false);
  });

  it("observes 'dark-mode' in observedAttributes", () => {
    expect(ShareButton.observedAttributes).toContain("dark-mode");
  });
});
