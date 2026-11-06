# Availability badge

An interactive status badge using the library's shared neutral surface and semantic availability color. Click or use the keyboard to change its state.

## Usage

Copy `index.tsx` into a React project with Tailwind CSS v4. No extra dependencies are required.

```tsx
import AvailabilityBadge from "./availability-badge";

<AvailabilityBadge />;
```

Its state is local. Connect it to your own settings if you need persistence. The `aria-pressed` attribute communicates the current toggle state.
