"use client";

import { Images } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ProductSliderProps = {
  productImages: string[];
};

export const ProductSlider = ({ productImages }: ProductSliderProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="rounded-lg bg-white p-4 md:flex-1">
      <div className="mb-4">
        <div className="mb-4 h-64 overflow-hidden rounded-lg md:h-96">
          {productImages.length > 0 ? (
            <Image
              src={`/products/${productImages[currentImage]}`}
              alt={`Product image ${currentImage + 1}`}
              width={500}
              height={500}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg border">
              <Images className="size-20 text-zinc-600" strokeWidth={1} />
            </div>
          )}
          <Image
            src={`/products/${productImages[currentImage]}`}
            alt={`Product image ${currentImage + 1}`}
            width={500}
            height={500}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex snap-x snap-mandatory justify-center space-x-4 overflow-x-auto">
          {productImages.length > 1 &&
            productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`size-20 flex-shrink-0 snap-center overflow-hidden rounded-lg border md:size-28 ${
                  index === currentImage
                    ? "border-2 border-blue-600 opacity-80"
                    : "border-2 border-gray-200"
                }`}
              >
                {image ? (
                  <Image
                    src={`/products/${image}` || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Images className="size-11 text-zinc-600" strokeWidth={1} />
                  </div>
                )}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
