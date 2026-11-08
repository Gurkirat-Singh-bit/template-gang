export type EntryKind = "component" | "template" | "resource";

export interface CatalogEntry {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  kind: EntryKind;
  tags: string[];
  componentGroup?: string;
  keywords?: string[];
  hidden?: boolean;
  files: string[];
  readme: string;
  preview: boolean;
  updatedAt: string;
  singleFile?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  count: number;
}

export interface Catalog {
  categories: Category[];
  entries: CatalogEntry[];
}
