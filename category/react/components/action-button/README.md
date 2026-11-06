# Action button

A confirmation button adapted from [VengeanceUI AnimatedButton](https://github.com/Ashutoshx7/VengeanceUI/blob/298075b/src/components/ui/animated-button.tsx). It retains the reference's neutral border, shine, and press response, using CSS animation instead of an animation dependency. Click to toggle its confirmation state.

## Usage

Copy `index.tsx` and `styles.css` into your React project. Requires React and `@phosphor-icons/react`. The `--vng-*` tokens are optional: the styles include the warehouse's carbon palette as fallbacks.

```tsx
import ActionButton from "./action-button";

<ActionButton label="Start a new project" />;
```

## Props

| Prop  | Type   | Default        |
| ----- | ------ | -------------- |
| label | string | Start building |

The button exposes its state with `aria-pressed`, supports keyboard activation, and respects reduced motion. Override `--vng-background`, `--vng-foreground`, and `--vng-border` to customize it.

## License

VengeanceUI is MIT licensed, copyright 2025–2026 Ashutoshx7. Keep the [upstream license notice](https://github.com/Ashutoshx7/VengeanceUI/blob/298075b/LICENSE) with redistributions of this adaptation. The repository copy is at `web/THIRD_PARTY_NOTICES.md`.
