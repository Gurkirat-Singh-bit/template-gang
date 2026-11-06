"use client";

import {
  AtomIcon,
  BrowsersIcon,
  CubeIcon,
  FireIcon,
  FolderSimpleIcon,
  GitBranchIcon,
  SquaresFourIcon,
  StackIcon,
} from "@phosphor-icons/react";

export function CategoryIcon({
  category,
  size = 20,
}: {
  category: string;
  size?: number;
}) {
  const Icon =
    (
      {
        react: AtomIcon,
        expo: AtomIcon,
        nextjs: BrowsersIcon,
        docker: CubeIcon,
        hono: FireIcon,
        "github-workflows": GitBranchIcon,
        turborepo: StackIcon,
        all: SquaresFourIcon,
      } as Record<string, typeof AtomIcon>
    )[category] ?? FolderSimpleIcon;
  return <Icon size={size} weight="regular" aria-hidden="true" />;
}
