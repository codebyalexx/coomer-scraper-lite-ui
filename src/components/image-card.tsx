"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

const ImageCard = ({ fileUrl, alt }: { fileUrl: string; alt: string }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = fileUrl;
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [fileUrl]);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div className="aspect-square bg-gray-200 animate-pulse" />;
  }

  const isHorizontal = dimensions.width > dimensions.height;

  return (
    <Card
      className={cn(
        "group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow p-0",
        isHorizontal ? "aspect-video col-span-2" : "aspect-[4/5]"
      )}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={fileUrl}
            alt={alt}
            className="object-cover"
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
