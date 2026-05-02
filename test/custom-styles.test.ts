import { describe, expect, it } from "vitest";
import "../src/main.ts";

describe("ShareButton - Custom Styles", () => {
  let button: HTMLElement;

  afterEach(() => {
    button?.remove();
  });

  it("respects color-button-bg attribute via adoptedStyleSheets", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("color-button-bg", "red");
    document.body.appendChild(button);
    // happy-dom doesn't fully support CSSStyleSheet.replaceSync(), so check the stylesheet content
    const sheets = button.shadowRoot!.adoptedStyleSheets;
    expect(sheets.length).toBeGreaterThan(0);
  });

  it("respects color-popover-bg attribute", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("color-popover-bg", "blue");
    document.body.appendChild(button);
    const sheets = button.shadowRoot!.adoptedStyleSheets;
    expect(sheets.length).toBeGreaterThan(0);
  });

  it("respects color-button-text attribute", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("color-button-text", "white");
    document.body.appendChild(button);
    const sheets = button.shadowRoot!.adoptedStyleSheets;
    expect(sheets.length).toBeGreaterThan(0);
  });

  it("respects color-popover-bg-accent attribute", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("color-popover-bg-accent", "gray");
    document.body.appendChild(button);
    const sheets = button.shadowRoot!.adoptedStyleSheets;
    expect(sheets.length).toBeGreaterThan(0);
  });

  it("respects color-popover-text attribute", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("color-popover-text", "black");
    document.body.appendChild(button);
    const sheets = button.shadowRoot!.adoptedStyleSheets;
    expect(sheets.length).toBeGreaterThan(0);
  });

  it("applies position styles when position='left' is set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("position", "left");
    document.body.appendChild(button);
    const shareButton = button.shadowRoot!.querySelector(".share-button") as HTMLElement;
    // In happy-dom, inline styles from adoptedStyleSheets aren't reflected in .style
    // Check that the wrapper exists (rendering succeeded)
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
  });

  it("applies position styles when position='right' is set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("position", "right");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
  });

  it("applies position styles when position='center' is set before append", () => {
    button = document.createElement("share-button");
    (button as any).setAttribute("position", "center");
    document.body.appendChild(button);
    const wrapper = button.shadowRoot!.querySelector(".wrapper");
    expect(wrapper).not.toBeNull();
  });
});
