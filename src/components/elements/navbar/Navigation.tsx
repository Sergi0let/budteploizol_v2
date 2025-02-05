"use client";

import Link from "next/link";

import { categoryLinks } from "@/data";

export const Navigation = () => {
  return (
    <nav className="hidden text-nowrap lg:block lg:space-x-2">
      {categoryLinks.map(({ id, name, url }) => (
        <Link
          key={id}
          href={url}
          className="font-semi-bold rounded-md px-3 py-[11px] text-xs uppercase leading-none transition-colors hover:bg-blue-600 hover:text-blue-100 xl:text-sm"
        >
          <span>{name}</span>
        </Link>
      ))}
    </nav>
  );
};
