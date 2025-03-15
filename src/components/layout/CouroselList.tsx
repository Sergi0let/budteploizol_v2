"use client";

import { ProductType } from "@/types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Card } from "./Card";

type CouroselListProps = {
  listItems: ProductType[];
  className?: string;
};

export const CouroselList = ({ listItems, className }: CouroselListProps) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 994px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 993px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (!listItems || listItems.length === 0) return null;

  return (
    <div className={`${className || ""}`}>
      <Splide
        options={{
          rewind: true,
          perPage: isDesktop ? 4 : isTablet ? 3 : isMobile ? 2 : 2,
          type: "slide",
          gap: "1rem",
          autoplay: true,
          interval: 3000,
          speed: 500,
          arrows: true,
          pagination: true,
        }}
        hasTrack={false}
        aria-label="carousel products"
      >
        <div className="custom-wrapper px-2">
          <SplideTrack>
            {listItems.map((item, index) => (
              <SplideSlide key={index}>
                <Card {...item} className="p-4" />
              </SplideSlide>
            ))}
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <ChevronLeft />
            </button>
            <ul className="splide__pagination"></ul>
            <button className="splide__arrow splide__arrow--next">
              <ChevronRight />
            </button>
          </div>
        </div>
      </Splide>
    </div>
  );
};
