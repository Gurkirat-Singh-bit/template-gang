# Interface system

Reference: [VengeanceUI](https://github.com/Ashutoshx7/VengeanceUI), commit `298075b`. The source and live catalog/component pages were inspected before implementation. The user then explicitly selected carbon black and JetBrains Mono, overriding the upstream font and default palette. Upstream paths and licensing are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Audit and implementation

| Previous issue                                        | Applied change                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| Invented olive/orange palette and workspace dashboard | Reference documentation shell, with the user-selected carbon palette           |
| Tiny 8–11px body text, fallback fonts                 | Self-hosted JetBrains Mono throughout, per user instruction                    |
| Identical cards for components and projects           | Two-column component canvases; compact template/resource rows                  |
| Separate catalog and viewer page styling              | Shared header, sidebar, navigation, divider and primitives                     |
| Many one-off controls and states                      | Shared button variants, shared inputs/selects, keyboard tabs and copy feedback |
| Source copy errors replaced the code                  | Independent copy feedback; source remains selectable                           |

## Tokens

`src/app/globals.css` owns the upstream `--vng-*` theme and Tailwind aliases. Do not introduce separate per-page palettes.

- Background/foreground: carbon `#080808` / `#ededed`.
- Secondary/border/muted text: `#1a1a1a` / `#282828` / `#a3a3a3`. All gray surfaces are neutral.
- Primary actions: white with carbon text; outline and ghost for secondary actions.
- Radii: 4px / 6px / 8px. Full radius is reserved for status badges.
- Spacing: 4, 8, 12, 16, 24, 32, 40, 48, 64px. Related label/control content uses 8px; sections use 32–48px.
- Motion: 150ms controls, 300ms viewport changes; respect reduced motion.

## Typography and composition

- JetBrains Mono 14/22px for UI and documentation body; 15–17px for introductions.
- Catalog headings 30px semibold; section headings 18–19px medium; branding 19px semibold.
- Detail headings use 28–30px bold.
- Monospace 11–12px for file paths and metadata. It never replaces readable body descriptions.
- Phosphor regular icons: 16px in controls, 20–24px for resource/brand symbols.
- Carbon is the default surface. Slightly lifted neutral surfaces distinguish controls, code and preview framing.
- Page, sidebar, dialogs and source panes retain visible themed scrollbars. Never hide overflow globally.
- Desktop: compact category navigation with a single-pixel divider. Only the active category expands to show items. Below 768px: a native modal category menu.

## Interaction scope

The existing input controls are search and sorting. Resource addition remains a file-based guide, not a new browser editing form. Explicit labels, focus rings, disabled/invalid primitive states, keyboard tab navigation, dialog focus trapping and copy/source failure feedback share one system.

Component examples use the same tokens, with portable fallbacks. The Action button adapts the reference's AnimatedButton using CSS rather than adding an animation framework. Source highlighting uses Prism, already present in the reference's dependencies, to support client-side file switching without an additional source endpoint.

The final user refinement removes the hero paragraph, statistics, repeated preview labels, gallery descriptions, extra navigation, and sidebar footer. Detail pages retain full source and documentation.

Loading uses geometry-matched skeletons for navigation, thumbnails, previews, source and documentation. Native lazy iframes defer offscreen demos; code highlighting and Markdown are separate dynamic imports rendered on demand. Popup entry takes 150ms with a 25ms lead-in; resource rows enter over 180ms with a small stagger. Reduced motion removes delays and animation. The sort/source selectors use the upstream Radix pattern with a carbon portal instead of an OS-native blue menu.
