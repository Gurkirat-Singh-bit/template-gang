"use client";

import { useEffect, useRef } from "react";
import {
  FileCodeIcon,
  FolderSimplePlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { CopyButton } from "./ui/copy-button";

export function AddResourceGuide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (open && !element?.open) element?.showModal();
    else if (!open && element?.open) element.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="resource-dialog"
      aria-labelledby="guide-title"
      aria-describedby="guide-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className="dialog-header">
        <div>
          <h2 id="guide-title">Add a resource</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close guide"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <p id="guide-description" className="body-muted">
        Add a folder inside category/. It appears on refresh.
      </p>
      <ol className="guide-steps">
        <li>
          <span className="step-number">01</span>
          <div>
            <h3>Choose a category</h3>
            <p>Use an existing folder, or create one.</p>
          </div>
          <FolderSimplePlusIcon size={20} />
        </li>
        <li>
          <span className="step-number">02</span>
          <div>
            <h3>Add your source</h3>
            <p>Include a README and an optional preview.</p>
          </div>
          <FileCodeIcon size={20} />
        </li>
      </ol>
      <div className="guide-tree">
        <div className="code-bar">
          <span>Example structure</span>
          <CopyButton
            text="category/react/components/your-component"
            label="Copy path"
          />
        </div>
        <pre>{`category/\n└── react/\n    └── components/\n        └── your-component/\n            ├── index.tsx\n            ├── preview.tsx\n            └── README.md`}</pre>
      </div>
      <dl className="guide-files">
        <div>
          <dt>README.md</dt>
          <dd>Documentation.</dd>
        </div>
        <div>
          <dt>preview.tsx</dt>
          <dd>Live React preview.</dd>
        </div>
        <div>
          <dt>
            item.json <span>optional</span>
          </dt>
          <dd>Title, type, and tags.</dd>
        </div>
      </dl>
      <p className="guide-hint">
        Restart <code>bun run dev</code> after adding a preview.
      </p>
      <div className="dialog-footer">
        <Button variant="outline" onClick={onClose}>
          Got it
        </Button>
      </div>
    </dialog>
  );
}
