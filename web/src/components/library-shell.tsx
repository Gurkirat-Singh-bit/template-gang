"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CubeIcon,
  ListIcon,
  PlusIcon,
  ArchiveBoxIcon,
  XIcon,
} from "@phosphor-icons/react";
import { componentGroups } from "@/lib/component-groups";
import type { Catalog } from "@/lib/types";
import { CategoryIcon } from "./icons";
import { Button } from "./ui/button";
import { AddResourceGuide } from "./add-resource-guide";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Warehouse home">
      <CubeIcon size={25} weight="regular" aria-hidden="true" />
      <span>Warehouse</span>
    </Link>
  );
}

export function LibraryShell({
  catalog,
  category = "all",
  currentEntry,
  onCategorySelect,
  componentGroup = "all",
  onComponentGroupSelect,
  children,
}: {
  catalog: Catalog;
  category?: string;
  currentEntry?: string;
  onCategorySelect?: (category: string) => void;
  componentGroup?: string;
  onComponentGroupSelect?: (group: string, category: string) => void;
  children: ReactNode;
}) {
  const [guide, setGuide] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = menuRef.current;
    if (menu && !element?.open) element?.showModal();
    if (!menu && element?.open) element.close();
    if (!menu && !guide) return;
    const previous = document.body.style.overflow;
    const previousRoot = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      document.documentElement.style.overflow = previousRoot;
    };
  }, [menu, guide]);
  function selectCategory(value: string) {
    onCategorySelect?.(value);
    setMenu(false);
  }

  const navigation = (
    <>
      <div className="sidebar-section">
        {onCategorySelect ? (
          <button
            className={`nav-item ${category === "all" ? "active" : ""}`}
            aria-pressed={category === "all"}
            onClick={() => selectCategory("all")}
          >
            <ArchiveBoxIcon size={16} />
            All resources<span>{catalog.entries.length}</span>
          </button>
        ) : (
          <Link href="/" className="nav-item">
            <ArchiveBoxIcon size={16} />
            All resources<span>{catalog.entries.length}</span>
          </Link>
        )}
      </div>
      <nav className="sidebar-section" aria-label="Categories">
        <div className="sidebar-section-heading">
          <span className="sidebar-label">Categories</span>
          <span className="sidebar-count">{catalog.categories.length}</span>
        </div>
        {catalog.categories.map((item) => {
          const items = catalog.entries.filter(
            (entry) => entry.category === item.slug,
          );
          const content = (
            <>
              <CategoryIcon category={item.slug} size={16} />
              <span className="nav-name">{item.title}</span>
              <span>{item.count}</span>
            </>
          );
          return (
            <div className="nav-category" key={item.slug}>
              {onCategorySelect ? (
                <button
                  className={`nav-item ${category === item.slug ? "active" : ""}`}
                  aria-pressed={category === item.slug}
                  onClick={() => selectCategory(item.slug)}
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={`/?category=${encodeURIComponent(item.slug)}`}
                  className={`nav-item ${category === item.slug ? "active" : ""}`}
                >
                  {content}
                </Link>
              )}
              {!!items.length && category === item.slug && (
                <div className="sidebar-children">
                  {items.some((entry) => entry.kind === "component") ? (
                    <>
                      {componentGroups(items).map((name) => {
                        const members = items.filter(
                          (entry) =>
                            entry.kind === "component" &&
                            (entry.componentGroup || "Other components") ===
                              name,
                        );
                        const active =
                          componentGroup === name ||
                          members.some((entry) => entry.id === currentEntry);
                        return (
                          <div key={name} className="sidebar-component-group">
                            {onComponentGroupSelect ? (
                              <button
                                type="button"
                                aria-pressed={active}
                                onClick={() => {
                                  onComponentGroupSelect(name, item.slug);
                                  setMenu(false);
                                }}
                              >
                                {name}
                                <span>{members.length}</span>
                              </button>
                            ) : (
                              <Link
                                prefetch={false}
                                href={`/?category=${encodeURIComponent(item.slug)}&group=${encodeURIComponent(name)}`}
                              >
                                {name}
                                <span>{members.length}</span>
                              </Link>
                            )}
                            {active &&
                              members.map((entry) => (
                                <Link
                                  key={entry.id}
                                  href={`/item/${entry.id}`}
                                  prefetch={false}
                                  aria-current={
                                    currentEntry === entry.id
                                      ? "page"
                                      : undefined
                                  }
                                  onClick={() => setMenu(false)}
                                  className="sidebar-component-link"
                                >
                                  {entry.title}
                                </Link>
                              ))}
                          </div>
                        );
                      })}
                      {items
                        .filter((entry) => entry.kind !== "component")
                        .map((entry) => (
                          <Link
                            key={entry.id}
                            href={`/item/${entry.id}`}
                            prefetch={false}
                            onClick={() => setMenu(false)}
                          >
                            {entry.title}
                          </Link>
                        ))}
                    </>
                  ) : (
                    <>
                      {" "}
                      {items.map((entry) => (
                        <Link
                          key={entry.id}
                          href={`/item/${entry.id}`}
                          prefetch={false}
                          aria-current={
                            currentEntry === entry.id ? "page" : undefined
                          }
                          onClick={() => setMenu(false)}
                        >
                          {entry.title}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <button
          className="nav-add"
          onClick={() => {
            setMenu(false);
            setGuide(true);
          }}
        >
          <PlusIcon size={15} />
          Add a category
        </button>
      </nav>
    </>
  );

  return (
    <div className="library-app">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-brand">
          <Button
            className="mobile-menu-trigger"
            variant="ghost"
            size="icon"
            aria-label="Open categories"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <ListIcon />
          </Button>
          <Brand />
        </div>
        <Button onClick={() => setGuide(true)} size="sm">
          <PlusIcon />
          Add resource
        </Button>
      </header>
      <div className="library-layout">
        <aside className="library-sidebar">{navigation}</aside>
        <div className="library-divider" aria-hidden="true" />
        <main id="main-content" className="library-main">
          {children}
        </main>
      </div>
      <dialog
        className="mobile-navigation"
        ref={menuRef}
        aria-label="Category navigation"
        onCancel={() => setMenu(false)}
        onClick={(event) => {
          if (
            event.target === event.currentTarget &&
            event.clientX > event.currentTarget.getBoundingClientRect().right
          )
            setMenu(false);
        }}
      >
        <div className="mobile-nav-heading">
          <Brand />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close categories"
            onClick={() => setMenu(false)}
          >
            <XIcon />
          </Button>
        </div>
        {navigation}
      </dialog>
      <AddResourceGuide open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
