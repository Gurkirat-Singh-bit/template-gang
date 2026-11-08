import type { CatalogEntry } from "./types";

const aliases: Record<string, string> = {
  Navbars: "navbar nav header navigation menu topbar",
  Buttons: "button action submit toggle",
  Inputs: "input inputs field fields controls",
  Forms: "form forms",
  Dialogs: "dialog modal popup drawer sheet booking intake form",
  Dropdowns: "dropdown popover combobox context menu",
  Tabs: "tabs tab segmented",
  Accordions: "accordion disclosure collapsible",
  Steps: "steps stepper process timeline",
  Cards: "card cards tile",
  Badges: "badge chip tag status indicator",
  Alerts: "alert toast notification feedback message",
  Loaders: "loader loaders loading",
  Avatars: "avatar profile user image",
  Tables: "table tables datagrid",
  Charts: "chart graph visualization",
  Footers: "footer footers",
  Heroes: "hero landing headline banner",
  Sidebars: "sidebar side navigation rail",
  Breadcrumbs: "breadcrumbs breadcrumb navigation",
  Pagination: "pagination pager pages",
  Carousels: "carousel slider slideshow gallery",
  Pricing: "pricing price plans tiers comparison",
  FAQ: "faq questions answers accordion",
  Features: "feature features",
  "Call to action": "cta call to action banner",
  Testimonials: "testimonials reviews quotes social proof",
  Logos: "logos logo brands",
  Integrations: "integration integrations",
  Stats: "stats statistics metrics counter numbers",
  Tools: "tool tools",
  Motion: "motion animation scroll reveal transitions",
  Layout: "layout container grid columns stack divider separator",
};
const order = Object.keys(aliases);

export function componentGroups(entries: CatalogEntry[]) {
  const names = [
    ...new Set(
      entries
        .filter((entry) => entry.kind === "component")
        .map((entry) => entry.componentGroup || "Other components"),
    ),
  ];
  return names.sort((a, b) => {
    const rank = (name: string) =>
      order.includes(name) ? order.indexOf(name) : order.length;
    return rank(a) - rank(b) || a.localeCompare(b);
  });
}

export function matchesSearch(entry: CatalogEntry, search: string) {
  const text =
    `${entry.title} ${entry.description} ${entry.category} ${entry.componentGroup || ""} ${aliases[entry.componentGroup || ""] || ""} ${entry.tags.join(" ")} ${entry.keywords?.join(" ") || ""}`.toLowerCase();
  return search
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .every((term) => text.includes(term));
}

/** A sensible default for new folders; item.json can override the group. */
export function inferComponentGroup(name: string) {
  const text = name
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_/.-]+/g, " ");
  const patterns: [RegExp, string][] = [
    [/\b(navbar|nav|navigation)\b/i, "Navbars"],
    [/\bfooter\b/i, "Footers"],
    [/\bhero\b/i, "Heroes"],
    [/\bsidebar\b/i, "Sidebars"],
    [/\bbreadcrumbs?\b/i, "Breadcrumbs"],
    [/\bpagination\b/i, "Pagination"],
    [/\bfaq\b/i, "FAQ"],
    [/\b(accordion|disclosure|collapsible)\b/i, "Accordions"],
    [/\b(dialog|modal|popup|drawer|sheet)\b/i, "Dialogs"],
    [/\b(dropdown|popover|combobox|menu)\b/i, "Dropdowns"],
    [/\btabs?\b/i, "Tabs"],
    [/\b(calculator|estimator|tester|checker)\b/i, "Tools"],
    [/\b(form|signup|registration|intake|booking)\b/i, "Forms"],
    [/\bbutton\b/i, "Buttons"],
    [/\b(input|textarea|select|checkbox|radio|switch)\b/i, "Inputs"],
    [/\b(badge|chip|indicator)\b/i, "Badges"],
    [/\b(alert|toast|notification)\b/i, "Alerts"],
    [/\b(loader|loading|spinner|skeleton|progress)\b/i, "Loaders"],
    [/\bavatar\b/i, "Avatars"],
    [/\btable\b/i, "Tables"],
    [/\b(chart|graph)\b/i, "Charts"],
    [/\b(pricing|plans)\b/i, "Pricing"],
    [/\b(testimonial|review)\b/i, "Testimonials"],
    [/\b(logo|logos|partner)\b/i, "Logos"],
    [/\b(carousel|slider|slideshow)\b/i, "Carousels"],
    [/\b(steps|stepper|process|timeline)\b/i, "Steps"],
    [/\bcard\b/i, "Cards"],
    [/\b(motion|animation|scroll)\b/i, "Motion"],
    [/\b(layout|container|divider|separator)\b/i, "Layout"],
    [/\bheader\b/i, "Navbars"],
  ];
  return (
    patterns.find(([pattern]) => pattern.test(text))?.[1] || "Other components"
  );
}
