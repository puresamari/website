"use server";

import Link from "next/link";
import { Fragment, ReactNode } from "react";

export async function BreadCrumbs({ crumbs, children }: { children: ReactNode; crumbs: { label: ReactNode; href: string }[] }) {
  return (
    <div className="flex flex-row gap-1 p-4">
      {crumbs.map(({ label, href }, i) => (
        <Fragment>
          <Link key={i} href={href} className="text-blue-500 underline">
            {label}
          </Link>
          <span>{'>'}</span>
        </Fragment>
      ))}
      <p className="text-bold">
        {children}
      </p>
    </div>
  );
}