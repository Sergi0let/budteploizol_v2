"use client";

import Link from "next/link";

import { categoryListData } from "@/data/category";

export const Navigation = () => {
  return (
    <nav className="hidden text-nowrap lg:flex">
      {categoryListData.map(({ id, name, link }) => (
        <Link
          key={id}
          href={`/catalog/${link}`}
          className="font-semi-bold rounded-md p-2 text-xs uppercase leading-none transition-colors hover:bg-blue-600 hover:text-blue-100 xl:text-sm"
        >
          <span>{name}</span>
        </Link>
      ))}
    </nav>
  );
};
