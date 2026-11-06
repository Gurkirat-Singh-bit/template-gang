import { Brand } from "./library-shell";
import { Skeleton } from "./ui/skeleton";

/** Matches the catalog geometry while Next.js streams the real file-backed content. */
export function LibrarySkeleton() {
  return (
    <div className="library-app" role="status" aria-label="Loading library">
      <span className="sr-only">Loading library…</span>
      <header className="site-header">
        <Brand />
        <Skeleton className="skeleton-header-action" />
      </header>
      <div className="library-layout">
        <aside
          className="library-sidebar skeleton-navigation"
          aria-hidden="true"
        >
          {[80, 55, 70, 90, 60, 78, 65, 72].map((width, index) => (
            <Skeleton key={index} style={{ width: `${width}%` }} />
          ))}
        </aside>
        <div className="library-divider" aria-hidden="true" />
        <main className="library-main">
          <Skeleton className="skeleton-library-title" />
          <Skeleton className="skeleton-library-toolbar" />
          <div className="skeleton-library-tabs">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="component-gallery">
            {[0, 1].map((item) => (
              <div key={item}>
                <Skeleton className="skeleton-library-preview" />
                <Skeleton className="skeleton-library-label" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
