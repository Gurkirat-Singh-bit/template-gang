# Project card

A compact, original project card with a working save toggle. The save state is local to the example and resets when the page reloads.

## Usage

Copy `index.tsx` into a React project with Tailwind CSS v4 and `@phosphor-icons/react`. It uses the shared VengeanceUI palette and radius tokens, with default values when those tokens are unavailable.

```tsx
import StackCard from "./stack-card";

<StackCard />;
```

Edit the text to match your project. The save state remains local to the component. Phosphor supplies the folder and save icons; no UI framework is required.
