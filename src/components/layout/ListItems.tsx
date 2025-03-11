"use client";

import { Card } from "@/components";
import { ProductType } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

export const ListItems = ({ items }: { items: ProductType[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div>
      <div className="flex h-12 items-center rounded-t-lg border-l border-r border-t px-5"></div>
      <ul className="list-items">
        {displayItems.map((items) => (
          <li className="list-item" key={items.id}>
            <Card {...items} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            className="icon-wrapper disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft />
          </button>
          <span className="px-4 py-2 font-mono text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
          <button
            className="icon-wrapper disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};
