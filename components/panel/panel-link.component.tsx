"use server";

import { ReactNode } from "react";
import { Panel, Theme } from "./panel.component";
import Link from "next/link";

export async function PanelLink({ href, children, theme }: {
  href: string;
  children: ReactNode;
  theme?: Theme;
}) {
  return (
    <Link className="group cursor-pointer" href={href}>
      <Panel theme={theme || 'blue'} className="flex flex-row">
        <div className="flex flex-1 uppercase font-bold">
          {children}
        </div>
        <p className="transition-transform group-hover:translate-x-4">
          {'>'}
        </p>
      </Panel>
    </Link>
  );
}