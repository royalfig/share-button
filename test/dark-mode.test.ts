import { beforeEach, describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Dark Mode", () => {
  let button: HTMLElement;

  beforeEach(() => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
  });

  afterEach(() => {
    button.remove();
  });

  it("defaults to auto dark mode (no attribute)", () => {
    expect(button.getAttribute("dark-mode")).toBeNull();
  });

  it("respects dark-mode='true' attribute", () => {
    (button as any).setAttribute("dark-mode", "true");
    const el = button as any;
    expect(el.darkMode).toBe("true");
  });

  it("respects dark-mode='false' attribute", () => {
    (button as any).setAttribute("dark-mode", "false");
    const el = button as any;
    expect(el.darkMode).toBe("false");
  });

  it("allows setting darkMode property", () => {
    const el = button as any;
    el.darkMode = "true";
    expect(button.getAttribute("dark-mode")).toBe("true");
  });

  it("reflects darkMode property back to attribute", () => {
    const el = button as any;
    el.darkMode = "false";
    expect(el.darkMode).toBe("false");
  });
});
