"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  ArrowSquareOutIcon,
  BookOpenIcon,
  CaretRightIcon,
  CodeIcon,
  DesktopIcon,
  DeviceMobileIcon,
  FileCodeIcon,
  FolderSimpleIcon,
} from "@phosphor-icons/react";
import type { Catalog, CatalogEntry } from "@/lib/types";
import { LibraryShell } from "./library-shell";
import { Button, buttonClass } from "./ui/button";
import { CopyButton } from "./ui/copy-button";
import { Select } from "./ui/input";
import { Tabs } from "./ui/tabs";
import { CodeSkeleton, DocumentSkeleton } from "./ui/skeleton";

const CodeBlock = dynamic(
  () => import("./code-block").then((module) => module.CodeBlock),
  { loading: CodeSkeleton },
);
const EntryDocumentation = dynamic(
  () =>
    import("./entry-documentation").then((module) => module.EntryDocumentation),
  { loading: DocumentSkeleton },
);

type EntryTab = "preview" | "code" | "docs";

export function EntryViewer({
  catalog,
  entry,
  initialFile,
  initialSource,
}: {
  catalog: Catalog;
  entry: CatalogEntry;
  initialFile: string;
  initialSource: string;
}) {
  const [tab, setTab] = useState<EntryTab>(
    entry.preview ? "preview" : entry.singleFile ? "code" : "docs",
  );
  const [file, setFile] = useState(initialFile);
  const [source, setSource] = useState(initialSource);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  async function loadFile(next: string) {
    const current = ++request.current;
    setFile(next);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/source?id=${encodeURIComponent(entry.id)}&file=${encodeURIComponent(next)}`,
      );
      if (!response.ok)
        throw new Error("This file couldn’t be loaded. Try again.");
      const text = await response.text();
      if (request.current === current) setSource(text);
    } catch (caught) {
      if (request.current === current)
        setError(
          caught instanceof Error ? caught.message : "Couldn’t load this file.",
        );
    } finally {
      if (request.current === current) setLoading(false);
    }
  }
  const tabs = [
    {
      value: "preview" as const,
      label: "Preview",
      icon: <DesktopIcon size={16} />,
      disabled: !entry.preview,
    },
    {
      value: "code" as const,
      label: "Source code",
      icon: <CodeIcon size={16} />,
    },
    {
      value: "docs" as const,
      label: "Documentation",
      icon: <BookOpenIcon size={16} />,
    },
  ];
  return (
    <LibraryShell
      catalog={catalog}
      category={entry.category}
      currentEntry={entry.id}
    >
      <div className="entry-page">
        <nav className="entry-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Library</Link>
          <CaretRightIcon />
          <Link href={`/?category=${entry.category}`}>
            {
              catalog.categories.find(
                (category) => category.slug === entry.category,
              )?.title
            }
          </Link>
          <CaretRightIcon />
          <span aria-current="page">{entry.title}</span>
        </nav>
        <header className="entry-heading">
          <h1>{entry.title}</h1>
          <p>{entry.description}</p>
          <div className="entry-metadata">
            <span className="type-badge">{entry.kind}</span>
            {entry.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        <div className="entry-controls">
          <Tabs
            id="entry"
            label="Resource content"
            value={tab}
            onChange={setTab}
            options={tabs}
          />
          <span className="entry-source-label">
            <FolderSimpleIcon size={14} />
            {entry.slug}
          </span>
        </div>
        <section
          role="tabpanel"
          id="entry-preview-panel"
          aria-labelledby="entry-preview-tab"
          hidden={tab !== "preview"}
          className="entry-panel"
        >
          {entry.preview && (
            <>
              <div className="preview-container">
                <div className="preview-toolbar">
                  <span className="preview-toolbar-label">
                    Interactive preview
                  </span>
                  <div
                    className="view-toggle"
                    role="group"
                    aria-label="Preview size"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Desktop preview"
                      aria-pressed={!mobile}
                      onClick={() => setMobile(false)}
                    >
                      <DesktopIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Mobile preview"
                      aria-pressed={mobile}
                      onClick={() => setMobile(true)}
                    >
                      <DeviceMobileIcon />
                    </Button>
                  </div>
                  <a
                    className={buttonClass({ variant: "ghost", size: "sm" })}
                    href={`/preview/${entry.id}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open preview in a new tab"
                  >
                    <ArrowSquareOutIcon />
                    <span className="preview-open-label">Open preview</span>
                  </a>
                </div>
                <div className="preview-stage">
                  <iframe
                    loading="lazy"
                    title={`${entry.title} interactive preview`}
                    src={`/preview/${entry.id}`}
                    style={{ width: mobile ? "min(375px, 100%)" : "100%" }}
                  />
                </div>
                <div className="preview-footer">
                  <span>
                    React <span aria-hidden="true">/</span> Tailwind CSS
                  </span>
                  <span>
                    {mobile ? "375px viewport" : "Responsive viewport"}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
        <section
          role="tabpanel"
          id="entry-code-panel"
          aria-labelledby="entry-code-tab"
          hidden={tab !== "code"}
          className="entry-panel"
        >
          <div className="source-panel">
            <aside className="file-list" aria-label="Source files">
              <div className="file-list-title">
                <span>Files</span>
                <span>{entry.files.length}</span>
              </div>
              {entry.files.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={file === item ? "active" : ""}
                  aria-pressed={file === item}
                  onClick={() => loadFile(item)}
                >
                  <FileCodeIcon size={16} />
                  <span>{item}</span>
                </button>
              ))}
            </aside>
            <div className="code-panel">
              <div className="code-bar">
                <label className="mobile-file-select">
                  <span className="sr-only">Source file</span>
                  <Select
                    id="source-file"
                    value={file}
                    onValueChange={loadFile}
                    label="Source file"
                    options={entry.files.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </label>
                <span className="desktop-file-name">
                  <FileCodeIcon size={15} />
                  {file || "Source files"}
                </span>
                <CopyButton
                  text={source}
                  disabled={loading || !!error || !file}
                />
              </div>
              <div className="code-content" aria-busy={loading}>
                {loading ? (
                  <CodeSkeleton />
                ) : error ? (
                  <div className="source-status source-error" role="alert">
                    <strong>Couldn’t load this file</strong>
                    <p>{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadFile(file)}
                    >
                      Try again
                    </Button>
                  </div>
                ) : source ? (
                  tab === "code" && <CodeBlock code={source} file={file} />
                ) : (
                  <div className="source-status">
                    Add a source file to this folder to see it here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          role="tabpanel"
          id="entry-docs-panel"
          aria-labelledby="entry-docs-tab"
          hidden={tab !== "docs"}
          className="entry-panel"
        >
          {tab === "docs" && (
            <EntryDocumentation
              entry={entry}
              onOpenFile={(selectedFile) => {
                setTab("code");
                loadFile(selectedFile);
              }}
            />
          )}
        </section>
        <div className="entry-location">
          <FolderSimpleIcon size={14} />
          <code>category/{entry.id}</code>
          <CopyButton text={`category/${entry.id}`} label="Copy path" />
        </div>
      </div>
    </LibraryShell>
  );
}
