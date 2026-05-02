---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Share Button
  text: A seamless, customizable sharing solution for web devs and designers
  tagline: Sending good vibes your way 
  image: 
    src: /galaxy.avif
    alt: An abstract portrayal of the share icon, with planets 
  actions:
    - theme: brand
      icon: arrow
      text: Get started
      link: /install
    - theme: alt
      text: Customization
      link: /customization/attributes

features:
  - icon: 🛠️
    title: Universal compatibility
    details: Built on standards, use this custom web component anywhere
  - icon: 😴
    title: Effortless integration
    details: Install via NPM or use the latest release directly on your site
  - icon: 💅
    title: Fully customizable
    details: Great out of the box styles with the ability to match your site's design
  - icon: 🔋
    title: Batteries included
    details: 1-click share to X, Bluesky, LinkedIn, Facebook, Email, WhatsApp, Telegram, and link copy.
---

<style>
  :root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg in oklch, #EA8824, #8FA402, #F02C69, #BE16FD, #370E9F  );
}
</style>

<div style="display:flex;justify-content:center;padding:2rem 0">
  <share-button></share-button>
</div>