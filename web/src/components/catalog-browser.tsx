"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CodeIcon,
  CommandIcon,
  FileCodeIcon,
  FolderSimpleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { Catalog, CatalogEntry, EntryKind } from "@/lib/types";
import { LibraryShell } from "./library-shell";
import { CategoryIcon } from "./icons";
import { Button } from "./ui/button";
import { Input, Select } from "./ui/input";
import { Tabs } from "./ui/tabs";
import { PreviewSkeleton } from "./ui/skeleton";

function ResourceItem({
  entry,
  list,
  index,
}: {
  entry: CatalogEntry;
  list: boolean;
  index: number;
}) {
  const [previewHeight, setPreviewHeight] = useState(220);
  const scaledPreview = entry.files.includes("component.tsx");
  const [previewScale, setPreviewScale] = useState(1);
  const [previewReady, setPreviewReady] = useState(false);
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const thumbnailContainer = useRef<HTMLDivElement>(null);
  const [previewInView, setPreviewInView] = useState(false);
  useEffect(() => {
    const container = thumbnailContainer.current;
    if (!container || previewInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreviewInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [list, previewInView]);
  useEffect(() => {
    const frame = previewFrame.current;
    if (!frame) return;
    let resize: ResizeObserver | undefined;
    let mutations: MutationObserver | undefined;
    let animation = 0;
    const attach = () => {
      resize?.disconnect();
      mutations?.disconnect();
      const content = frame.contentDocument;
      if (!content?.body) return;
      const connect = () => {
        const stage = content.querySelector<HTMLElement>(".preview-page");
        const example = stage?.firstElementChild;
        if (
          !stage ||
          !example ||
          example.matches(".preview-loading, .preview-skeleton")
        )
          return;
        const fit = () => {
          const style = content.defaultView?.getComputedStyle(stage);
          const padding =
            parseFloat(style?.paddingTop ?? "0") +
            parseFloat(style?.paddingBottom ?? "0");
          const scale = scaledPreview
            ? (frame.parentElement?.clientWidth ?? 1280) / 1280
            : 1;
          const measuredHeight = Math.ceil(
            example.getBoundingClientRect().height + padding + 2,
          );
          setPreviewScale(scale);
          setPreviewReady(true);
          setPreviewHeight(
            Math.max(
              220,
              Math.min(
                420,
                Math.ceil((scaledPreview ? 900 : measuredHeight) * scale),
              ),
            ),
          );
        };
        animation = requestAnimationFrame(fit);
        resize = new ResizeObserver(fit);
        resize.observe(example);
        if (frame.parentElement) resize.observe(frame.parentElement);
        mutations?.disconnect();
      };
      mutations = new MutationObserver(connect);
      mutations.observe(content.body, { childList: true, subtree: true });
      connect();
    };
    // The iframe can finish loading before React hydrates its parent.
    frame.addEventListener("load", attach);
    attach();
    return () => {
      frame.removeEventListener("load", attach);
      resize?.disconnect();
      mutations?.disconnect();
      cancelAnimationFrame(animation);
    };
  }, [list, entry.preview, scaledPreview, previewInView]);
  return (
    <Link
      href={`/item/${entry.id}`}
      prefetch={false}
      style={{ animationDelay: `${Math.min(index, 5) * 35}ms` }}
      className={`resource-item ${entry.kind === "component" && !list ? "resource-item--showcase" : "resource-item--row"}`}
    >
      {entry.kind === "component" && !list ? (
        <div
          ref={thumbnailContainer}
          className="resource-preview"
          style={{ height: previewHeight }}
        >
          {entry.preview && !previewReady && (
            <div className="thumbnail-skeleton">
              <PreviewSkeleton />
            </div>
          )}
          {entry.preview && previewInView ? (
            <iframe
              style={
                scaledPreview
                  ? {
                      width: 1280,
                      height: 900,
                      transform: `scale(${previewScale})`,
                      transformOrigin: "top left",
                    }
                  : undefined
              }
              src={`/preview/${entry.id}${scaledPreview ? "?thumbnail=1" : ""}`}
              title={`${entry.title} thumbnail`}
              tabIndex={-1}
              loading="lazy"
              className={`thumbnail-frame ${previewReady ? "is-ready" : ""}`}
              aria-hidden="true"
              ref={previewFrame}
            />
          ) : !entry.preview ? (
            <div className="preview-placeholder">
              <CodeIcon size={24} />
              <span>Source available</span>
            </div>
          ) : null}
          <span className="preview-open">
            <ArrowUpRightIcon size={16} />
          </span>
        </div>
      ) : (
        <span className="resource-symbol">
          <CategoryIcon category={entry.category} size={21} />
        </span>
      )}
      <div className="resource-info">
        <div className="resource-title">
          <h3>{entry.title}</h3>
          <span className="resource-category">{entry.category}</span>
          <ArrowUpRightIcon size={16} />
        </div>
        {(entry.kind !== "component" || list) && <p>{entry.description}</p>}
      </div>
      {(entry.kind !== "component" || list) && (
        <span className="resource-files">
          <FileCodeIcon size={15} />
          {entry.files.length} {entry.files.length === 1 ? "file" : "files"}
        </span>
      )}
    </Link>
  );
}

const kindLabels: Record<EntryKind, string> = {
  component: "Components",
  template: "Templates",
  resource: "Resources",
};

export function CatalogBrowser({
  catalog,
  initialCategory = "all",
}: {
  catalog: Catalog;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(
    catalog.categories.some((item) => item.slug === initialCategory)
      ? initialCategory
      : "all",
  );
  const [kind, setKind] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("name");
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const entries = catalog.entries
    .filter(
      (entry) =>
        (category === "all" || entry.category === category) &&
        (kind === "all" || entry.kind === kind) &&
        `${entry.title} ${entry.description} ${entry.category} ${entry.tags.join(" ")}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "recent"
        ? b.updatedAt.localeCompare(a.updatedAt)
        : a.title.localeCompare(b.title),
    );
  const categoryTitle = catalog.categories.find(
    (item) => item.slug === category,
  )?.title;
  return (
    <LibraryShell
      catalog={catalog}
      category={category}
      onCategorySelect={setCategory}
    >
      <section className="catalog-intro" aria-labelledby="catalog-heading">
        <h1 id="catalog-heading">
          {category === "all" ? "Library" : categoryTitle}
        </h1>
      </section>
      <section
        id="collection"
        className="collection"
        aria-label="Resource library"
      >
        <div className="collection-toolbar">
          <div className="search-group">
            <label htmlFor="resource-search" className="sr-only">
              Find a resource
            </label>
            <div className="search-input">
              <MagnifyingGlassIcon size={17} />
              <Input
                ref={searchRef}
                id="resource-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search library…"
                aria-describedby="search-help"
              />
              {search ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <XIcon />
                </Button>
              ) : (
                <kbd>
                  <CommandIcon size={12} />K
                </kbd>
              )}
            </div>
            <span id="search-help" className="sr-only">
              Search by name, description, category, or tag. Press Control or
              Command K to focus.
            </span>
          </div>
          <div className="sort-group">
            <label id="sort-label" className="sr-only" htmlFor="resource-sort">
              Sort by
            </label>
            <Select
              id="resource-sort"
              value={sort}
              onValueChange={setSort}
              labelledBy="sort-label"
              options={[
                { value: "name", label: "Name: A–Z" },
                { value: "recent", label: "Recently added" },
              ]}
            />
          </div>
          <div className="layout-group">
            <span className="sr-only" id="layout-label">
              View
            </span>
            <div
              className="view-toggle"
              role="group"
              aria-labelledby="layout-label"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                <SquaresFourIcon />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <ListIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="collection-filters">
          <Tabs
            label="Resource types"
            variant="underline"
            value={kind}
            onChange={setKind}
            options={[
              { value: "all", label: "Everything" },
              { value: "component", label: "Components" },
              { value: "template", label: "Templates" },
              { value: "resource", label: "Resources" },
            ]}
          />
          <span className="result-count" role="status">
            {entries.length} {entries.length === 1 ? "resource" : "resources"}
          </span>
        </div>
        {entries.length ? (
          <div className={view === "list" ? "entry-list" : "entry-sections"}>
            {(["component", "template", "resource"] as EntryKind[]).map(
              (entryKind) => {
                const items = entries.filter(
                  (entry) => entry.kind === entryKind,
                );
                if (!items.length) return null;
                return (
                  <section
                    className="resource-section"
                    aria-labelledby={`${entryKind}-heading`}
                    key={entryKind}
                  >
                    <div className="section-heading">
                      <div>
                        <h2 id={`${entryKind}-heading`}>
                          {kindLabels[entryKind]}
                          <span>
                            {items.length.toString().padStart(2, "0")}
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div
                      className={
                        entryKind === "component" && view === "grid"
                          ? "component-gallery"
                          : "resource-rows"
                      }
                    >
                      {items.map((entry, index) => (
                        <ResourceItem
                          key={entry.id}
                          entry={entry}
                          list={view === "list"}
                          index={index}
                        />
                      ))}
                    </div>
                  </section>
                );
              },
            )}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">
              {search || kind !== "all" ? (
                <MagnifyingGlassIcon size={23} />
              ) : (
                <FolderSimpleIcon size={23} />
              )}
            </span>
            <h2>
              {search || kind !== "all" ? "No matches" : "No resources yet"}
            </h2>
            <p>
              {search || kind !== "all"
                ? "Try another search or clear the filters."
                : `Add a folder to category/${category === "all" ? "your-category" : category}.`}
            </p>
            {(search || kind !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setKind("all");
                }}
              >
                Clear filters
                <ArrowRightIcon />
              </Button>
            )}
          </div>
        )}
      </section>
    </LibraryShell>
  );
}
