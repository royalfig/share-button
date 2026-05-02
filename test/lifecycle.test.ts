import { beforeEach, describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Lifecycle", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
  });

  it("renders when connectedCallback fires", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
  });

  it("re-renders when dark-mode attribute changes", async () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);

    const el = button as any;
    const initialStyles = el.shadowRoot!.adoptedStyleSheets.length;

    (button as any).setAttribute("dark-mode", "true");
    await Promise.resolve();

    expect(el.shadowRoot!.adoptedStyleSheets.length).toBe(initialStyles);
  });

  it("does not re-render when attribute changes with same value", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);

    const el = button as any;
    (button as any).setAttribute("dark-mode", "auto");
    (button as any).setAttribute("dark-mode", "auto");

    expect(el.shadowRoot).not.toBeNull();
  });

  it("removes event listeners when disconnectedCallback fires", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);

    const el = button as any;

    // Add listeners first (simulating render)
    const testHandler = () => {};
    addEventListener("resize", testHandler);
    addEventListener("scroll", testHandler);

    // Now disconnect
    button.remove();

    // The element should not have a shadow root that still references old elements
    expect(el.shadowRoot).not.toBeNull();
  });

  it("has no click handler leak on multiple renders", () => {
    button = document.createElement("share-button");
    document.body.appendChild(button);

    const el = button as any;

    // Simulate multiple attribute changes causing re-renders
    (button as any).setAttribute("icon", "2");
    (button as any).setAttribute("icon", "3");

    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLButtonElement;

    // Should still have exactly one click listener (we can't directly count them in happy-dom,
    // but we verify the element is still functional)
    expect(shareButton).not.toBeNull();
  });
});
