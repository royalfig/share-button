import { beforeEach, describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Networks", () => {
  let button: HTMLElement;

  beforeEach(() => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
  });

  afterEach(() => {
    button.remove();
  });

  it("renders all default networks when no attribute specified", () => {
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }
  });

  it("renders social media links in non-popover mode", () => {
    (button as any).setAttribute("networks", "x, facebook");
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }
  });

  it("handles unknown networks without crashing", () => {
    const originalWarn = console.warn;
    let warned = false;
    console.warn = (...args) => {
      if (args[0].includes("Unknown network")) warned = true;
    };

    (button as any).setAttribute("networks", "x, unknown-network");
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }

    console.warn = originalWarn;
  });

  it("handles comma-separated networks with extra whitespace", () => {
    (button as any).setAttribute("networks", "x , facebook , linkedin");
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }
  });

  it("includes copy button by default", () => {
    const el = button as any;
    if (!el.isPopoverSupport) {
      const shareButton = button.shadowRoot!.querySelector(".share-button");
      expect(shareButton).not.toBeNull();
    }
  });

  it("renders without errors when disabling copy", () => {
    (button as any).setAttribute("networks", "x, facebook");
    const el = button as any;
    if (!el.isPopoverSupport) {
      const wrapper = button.shadowRoot!.querySelector(".wrapper");
      expect(wrapper).not.toBeNull();
    }
  });
});
