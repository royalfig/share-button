<script setup>
import DarkModeExample from "../components/DarkModeExample.vue"
</script>

# Dark mode

Out of the box, the share button will respect the user's system preference, using dark mode when dark mode is preferred and vice versa.

## Disable dark mode

To disable dark mode altogether, set the `dark-mode` attribute to false:

```html
<share-button dark-mode="false"></share-button>
```

<ClientOnly>
<div class="sb-container">
    <share-button dark-mode="false"></share-button>
</div>
</ClientOnly>

## Disable light mode

To disable light mode, set the `dark-mode` attribute to `true`.

```html
<share-button></share-button>
```

<ClientOnly>
<div class="sb-container">
    <share-button dark-mode="true"></share-button>
</div>
</ClientOnly>

## Toggle dark mode

If you site has a dark mode toggle, you can also control the button's dark mode by updating the `dark-mode` attribute in line with the site.

<ClientOnly>
<DarkModeExample />
</ClientOnly>
