# Mission India Smooth Scroll

Adapted from `components/smooth-scroll.tsx` in your Mission India project. The original project is unchanged.

## Usage

Copy this entire folder, including `assets/`, `support/` when present, and `styles.css`, into a Next.js project with React, TypeScript, Tailwind CSS v4, and Phosphor Icons. Import the named export from `index.tsx`; the wrapper applies the original project's isolated theme. The actual implementation is in `component.tsx`.

```tsx
import { SmoothScroll } from "./mission-india-smooth-scroll";

<>
  <SmoothScroll />
  <div className="mi-scope p-8">
    <h2 className="mb-6 text-3xl">Smooth scroll</h2>
    <a href="#scroll-target" className="underline">
      Scroll to the next section ↓
    </a>
    <div className="min-h-[110vh] py-16">
      Scroll this preview to try the Lenis behavior.
    </div>
    <section id="scroll-target" className="min-h-[70vh] py-16 text-3xl">
      You reached the next section.
    </section>
  </div>
</>;
```

## Adaptation notes

- Original layout and responsive behavior are preserved; project CSS is namespaced to prevent catalog style leaks.
- Images and fonts are local imports, not dependencies on the original project folder.
- Internal links are intercepted only by the preview harness; the reusable component retains its normal link behavior.
- Add the source-family Tailwind tokens from this folder's theme notes when using the component outside this warehouse.
- Requires `lenis`. The preview adds scrollable content because this is a behavior component with no visible output. Reduced motion disables smoothing.

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
