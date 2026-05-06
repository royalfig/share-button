---
title: Customizing the share button with attributes
---

# Attributes

Use `attributes` to make quick changes to the share button.

## Icon

There are seven icons available.

<div class="sb-container">
    <share-button icon="1">1</share-button>
    <share-button icon="2">2</share-button>
    <share-button icon="3">3</share-button>
    <share-button icon="4">4</share-button>
    <share-button icon="5">5</share-button>
    <share-button icon="6">6</share-button>
    <share-button icon="7">7</share-button>
</div>

Change the icon attribute to the icon you want to use:

```html
<share-button icon="3"></share-button>
```

By default, the button uses icon `1`.

The share button uses the fantastic [Remix Icon Library](https://remixicon.com/).

## Text

The button defaults to "Share." Customize text by adding it between the tags:

```html
<share-button>Compartir</share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button>Compartir</share-button>
</div>
</ClientOnly>

For a button without text, use the `circle` attribute. The attribute makes the button round, omitting the text and keeping the icon centered.

```html
<share-button circle></share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button circle></share-button>
</div>
</ClientOnly>

For a button without an icon, set the `icon` attribute to `false`.

```html
<share-button icon="false"></share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button icon="false"></share-button>
</div>
</ClientOnly>

## Color

Use the `color-button` attribute to change the button's color. Any valid CSS value works.

```html
<share-button color-button-bg="#f02c69"></share-button>
```

<div class="sb-container">
    <share-button color-button-bg="#f02c69"></share-button>
</div>

You can also change the color of the button's text with `color-button-text`:

```html
<share-button
  color-button-bg="lch(85% 130.5 140.21)"
  color-button-text="#000"
></share-button>
```

<ClientOnly>
<div class="sb-container">
    <share-button color-button-bg="lch(85% 130.5 140.21)" color-button-text="#000"></share-button>
</div>
</ClientOnly>

Change the popover color and text like this:

```html
<share-button
  color-popover-bg="#f02c69"
  color-popover-text="#fff"
></share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button
  color-popover-bg="#f02c69"
  color-popover-text="#fff"
></share-button>
</div>
</ClientOnly>

Here is the full list of color attributes and their default values:

| Attribute            | Description              | Default                                                                                                                 |
| -------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `color-button-bg`    | Button background        | <span style="padding: .5rem; background-color: hsl(242deg 55.5% 2.74%); color: #ffffff;">hsl(242deg 55.5% 2.74%)</span> |
| `color-button-text`  | Button text              | <span style="padding: .5rem; background-color: hsl(242deg 9.58% 98%); color: #000000;">hsl(242deg 9.58% 98%)</span>     |
| `color-popover-bg`   | Popover background       | <span style="padding: .5rem; background-color: hsl(242deg 9.58% 98%); color: #000000;">hsl(242deg 9.58% 98%)</span>     |
| `color-popover-bg`   | Popover background hover | <span style="padding: .5rem; background-color: hsl(242deg 9.58% 88%); color: #000000;">hsl(242deg 9.58% 88%)</span>     |
| `color-popover-text` | Popover text             | <span style="padding: .5rem; background-color: hsl(242deg 55.5% 2.74%); color: #ffffff;">hsl(242deg 55.5% 2.74%)</span> |

## Networks

You can specify which social networks your share button shows as well as their order.

Available networks include:

- X (formerly Twitter)
- Bluesky
- Threads
- LinkedIn
- Facebook
- Email (opens an email client if configured)
- WhatsApp
- Telegram
- Copy (copies the current URL to the user's clipboard)

By default, all options are present, in the order above.

To customize networks and their order, use the `networks` attribute and pass in the desired networks in a comma-separated list. Networks will appear in the same order as entered.

```html
<share-button networks="email,copy,facebook"></share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button networks="email,copy,facebook"></share-button>
</div>
</ClientOnly>

::: tip Hey there!
Don't see a network you want to use? File a [GitHub issue](https://github.com/royalfig/share-button/issues) to get it added!
:::

### Inline share buttons

It's also possible to only display the social media icons and omit the button altogether using the `atomic` attribute:

```html
<share-button atomic></share-button>
```

<ClientOnly>
<div class="sb-container">
<share-button atomic></share-button>
</div>
</ClientOnly>

## Sticky share button

By default, the button appears wherever you add it to the page. However, it's also possible to make give it a fixed or sticky position at the bottom of the page.

Use the `position` attribute with `left`, `center`, or `right` to customize the button's position.

```html
<share-button position="left"></share-button>
```

<ClientOnly>
<share-button position="left"></share-button>
</ClientOnly>
