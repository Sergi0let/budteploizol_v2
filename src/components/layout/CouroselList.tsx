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
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(min-width: 480px)" });

  if (!listItems) return null;

  return (
    <div className={`py-4 ${className || ""}`}>
      <Splide
        options={{
          rewind: true,
          perPage: isDesktop ? 4 : isTablet ? 3.2 : isMobile ? 2.2 : 1.2,
          type: "loop",

          gap: "1rem",
        }}
        hasTrack={false}
        aria-label="carousel products"
      >
        <div className="custom-wrapper">
          <SplideTrack>
            {listItems.map((item, index) => (
              <SplideSlide key={index}>
                <Card {...item} />
              </SplideSlide>
            ))}
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev icon-wrapper">
              <ChevronLeft />
            </button>
            <button className="splide__arrow splide__arrow--next icon-wrapper">
              <ChevronRight />
            </button>
          </div>
        </div>
      </Splide>
    </div>
  );
};
