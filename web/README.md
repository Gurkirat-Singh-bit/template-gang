# Warehouse frontend

A Next.js App Router catalog using TypeScript, Tailwind CSS v4, Bun, and Phosphor icons. Content stays in `../category/`. The website reads your projects without moving or rewriting them.

## Development

```sh
bun install
bun run dev
```

Run commands from `web/`. Open the address printed by Next.js.

New categories and ordinary entries appear on refresh. Restart the dev server after adding, renaming, or removing a `preview.tsx`; edits to an existing preview reload normally.

```sh
bun run typecheck
bun run lint
bun test tests/catalog.test.ts
bun run build
bun run start
```

Keep the parent `category/` available when running the server. For deployment, include the whole repository as the build context and use `web/` as the working directory. The build includes category files in Next.js file tracing. This filesystem-backed app needs a server; it is not a static export.

## Add a category or item

```text
category/
  expo/
    expo-01/                 Existing standalone project
      README.md
  docker/
    postgres/               Another reusable item
      compose.yml
      README.md
  react/
    components/             Optional grouping folder
      action-button/
        index.tsx
        preview.tsx
        README.md
        item.json
```

Every direct child of `category/` becomes a category, including empty folders. Inside each category, a project folder becomes an item. The optional grouping folders `components`, `templates`, `blocks`, `screens`, `snippets`, `resources`, and `hooks` expose their child folders as items. No separate index or database is required.

Loose code/text files also appear as resources, so a workflow can simply live at `category/github-workflows/build.yml` without an extra folder.

A README supplies documentation. Without metadata, the item uses its folder name or README heading and a short description. Existing starter placeholders such as `{{DISPLAY_NAME}}` are ignored for catalog titles.

Optionally add `item.json` for a better card:

```json
{
  "title": "My component",
  "description": "What this is useful for.",
  "kind": "component",
  "tags": ["Tailwind v4", "Animation"]
}
```

Supported kinds: `component`, `template`, `resource`. The file is optional. Keep JSON valid; invalid metadata produces a recoverable library error.

## Live React showcases

1. Put reusable source in the item folder, such as `index.tsx`.
2. Add a `preview.tsx` with a default-exported React component rendering an example.
3. Add `"use client"` to components using hooks or browser events.
4. Restart `bun run dev` after adding a new preview.

The generated preview registry loads the selected real source on demand, keeping previews and source tabs synchronized. It is generated before dev/build and is not committed. The examples follow the shared theme; the Action button adapts VengeanceUI AnimatedButton under its MIT license. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Tailwind scans `category/` as well as the frontend. React imports from category files resolve to the frontend's React installation. Install any other preview dependencies with `bun add` in `web/`. Examples should use relative imports within their folders rather than assuming the original project's path aliases exist.

Each showcase includes an interactive iframe, desktop/mobile widths, a standalone preview, browsable source files, copy controls, and README documentation. Iframes separate styles and layout. They execute reviewed local components and do not sandbox arbitrary downloaded code. Native/Expo projects display source and documentation; they are not automatically executable in the browser.

## Frontend structure

- `src/app/`: catalog, item, preview, source API, and fallback routes.
- `src/components/`: shared library shell, resource gallery, entry viewer and reusable primitives.
- `src/lib/catalog.ts`: filesystem discovery and source loading, server only.
- `src/lib/types.ts`: shared catalog contracts.
- `scripts/generate-previews.ts`: build-time React preview discovery.
- `src/app/globals.css`: Tailwind v4, theme, responsive catalog styling.

Source browsing includes common text/code formats. It skips hidden files, lockfiles, credential-named files, generated directories, and symlinks. Each item has a 200-file cap and a 200 KB per-file limit. The source API only serves files on the discovered list. Place only material intended for browsing in `category/`.

Adding resources in the UI opens instructions; it does not write to the repository from the browser. Dates for “Recently added” use folder modification times rather than Git history. Search/filter state is local to the current page.

## Browser checks

```sh
bunx --bun playwright install chromium
bun run test:e2e
```

The suite starts its own development server on port 3100. If a development server is already running, use `WAREHOUSE_BASE_URL=http://localhost:3000 bun run test:e2e` to reuse it. Tests cover browsing, filters, keyboard navigation, interactive previews, source/clipboard errors, dialogs, mobile layout, and missing resources.

The interface uses carbon black and self-hosted JetBrains Mono. Shared tokens and design decisions are documented in [DESIGN.md](DESIGN.md).

## Imported components

The React category includes 9 Mission India components and 22 RepoAssistant components, each with its own preview, implementation, scoped styles, local assets, and usage notes. Open an item to preview it or copy its source. Copy the entire item folder when reusing it; `component.tsx` contains the implementation and `index.tsx` supplies its theme wrapper.

The original source projects are untouched. Interest, booking, checkout, and URL-check integrations use clearly labeled local demos. Connect the documented `onSubmit`, `onBook`, or `testUrl` callbacks to your own services. Calculators keep their original calculations. Catalog thumbnails scale larger sections; the item viewer renders the real responsive component.

## Find components by purpose

Components are grouped as Navbars, Buttons, Forms, Footers, Heroes, Pricing, FAQ, and other functional types. Use the Component type filter or the category sidebar groups. Search accepts combinations such as `pricing cards`, `signup form`, `vps calculator`, or `repoassistant navbar`; project names remain searchable provenance rather than titles.

Set `componentGroup` in an item's `item.json` to choose its group. Without it, common names such as navbar, footer, button, and form are detected automatically. `hidden: true` keeps source files in the repository while excluding an entry and its preview from the catalog. The decorative reference-image demo is hidden.

Add search aliases in `keywords` rather than visible `tags`; the detail page shows only concise tags and keeps aliases out of the UI.
