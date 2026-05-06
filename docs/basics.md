---
title: The basics of using the share button
---

# Basic usage

After [installing](./install.md) the button, add the `share-button` whereever you want it to appear.

```html
<share-button></share-button>
```

<div class="sb-container">
    <share-button></share-button>
</div>


## How it works

When on an iOS or Android device, clicking the share button triggers the [native share menu](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API), which provides a wide range of sharing opportunities and seamless experience.

When on other platforms, where the share menu isn't as well implemented, the button triggers a popover menu that supports sharing to X, Bluesky, Threads, Facebook, LinkedIn, WhatsApp, Telegram, Email, and copying the link (or [any mixture of these you choose](./customization/attributes#networks)). 

## Fully customizable

The share button is almost completely customizable via [attributes](./customization/attributes.md) and [CSS](./customization/advanced.md).

::: info Tip 💁
Use `attributes` for basic changes like customizing the button's color, text, and social media networks. For more advanced changes, use CSS.
:::
