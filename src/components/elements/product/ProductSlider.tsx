"use client";

import Image from "next/image";
import { useState } from "react";

type ProductSliderProps = {
  productImages: string[];
};

export const ProductSlider = ({ productImages }: ProductSliderProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="px-4 md:flex-1">
      <div className="mb-4">
        <div className="mb-4 h-64 overflow-hidden rounded-lg md:h-96">
          <Image
            src={`/${productImages[currentImage]}` || "/placeholder.svg"}
            alt={`Product image ${currentImage + 1}`}
            width={500}
            height={500}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`size-20 flex-shrink-0 overflow-hidden rounded-lg border md:size-28 ${
                index === currentImage
                  ? "border-2 border-blue-600 opacity-80"
                  : "border-2 border-gray-200"
              }`}
            >
              <Image
                src={`/${image}` || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
