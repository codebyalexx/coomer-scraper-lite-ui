"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import { csapiImageLoader } from "@/lib/csapi-image-loader";

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

  //const isHorizontal = dimensions.width > dimensions.height;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            "group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow p-0",
            //isHorizontal ? "aspect-video col-span-2" : "aspect-[4/5]"
            "aspect-square"
          )}
        >
          <CardContent className="p-0">
            <div className="relative">
              <Image
                loader={csapiImageLoader}
                src={fileUrl}
                alt={alt}
                className="object-cover"
                width={dimensions.width}
                height={dimensions.height}
              />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="!max-w-none w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-4">
          <DialogTitle>{alt.split("-")[1]}</DialogTitle>
        </DialogHeader>

        <Link
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 w-full flex items-center justify-center overflow-hidden"
        >
          <Image
            loader={csapiImageLoader}
            src={fileUrl}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-full object-contain"
          />
        </Link>

        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCard;
