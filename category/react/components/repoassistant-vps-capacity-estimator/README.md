# RepoAssistant Vps Capacity Estimator

Adapted from `src/components/tools/vps-capacity-estimator.tsx` in your RepoAssistant project. The original project is unchanged.

## Usage

Copy this entire folder, including `assets/`, `support/` when present, and `styles.css`, into a Next.js project with React, TypeScript, Tailwind CSS v4, and Phosphor Icons. Import the named export from `index.tsx`; the wrapper applies the original project's isolated theme. The actual implementation is in `component.tsx`.

```tsx
import { VpsCapacityEstimator } from "./repoassistant-vps-capacity-estimator";

<VpsCapacityEstimator />;
```

## Adaptation notes

- Original layout and responsive behavior are preserved; project CSS is namespaced to prevent catalog style leaks.
- Images and fonts are local imports, not dependencies on the original project folder.
- Internal links are intercepted only by the preview harness; the reusable component retains its normal link behavior.
- Add the source-family Tailwind tokens from this folder's theme notes when using the component outside this warehouse.

## Tailwind theme

```css
@theme {
  --color-mi-paper: #faf9f6;
  --color-mi-ink: #14191b;
  --color-mi-wisteria-blue-300: #94afd1;
  --color-mi-wisteria-blue-600: #567ca8;
  --color-ra-soft-green: #edf4ea;
  --shadow-ra-integration: 0 6px 18.6px rgb(208 208 208 / 45%);
}
```
