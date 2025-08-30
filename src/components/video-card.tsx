"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { cn, fileRoutes } from "@/lib/utils";
import { ClapperboardIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { csapiImageLoader } from "@/lib/csapi-image-loader";

const DynamicVideoCard = ({ fileUrl }: { fileUrl: string }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    duration: 0,
  });

  useEffect(() => {
    // 1. On crée un élément video
    const video = document.createElement("video");
    video.src = fileUrl;

    // 2. On écoute l'événement 'loadedmetadata'
    const handleMetadataLoaded = () => {
      // 3. On met à jour l'état avec les dimensions
      setDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      });
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);

    // Fonction de nettoyage pour éviter les fuites de mémoire
    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
    };
  }, [fileUrl]);

  // Pendant le chargement des métadonnées, on affiche un placeholder
  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <Link
        href={`/watch?url=${encodeURIComponent(fileUrl)}`}
        className="w-full aspect-video bg-gray-200 rounded-md animate-pulse"
      />
    );
  }

  // Une fois les dimensions connues, on calcule l'orientation
  const isHorizontal = dimensions.width > dimensions.height;
  const isSquare = dimensions.width === dimensions.height;

  let aspectRatioClass = "aspect-video"; // Horizontal par défaut
  if (isSquare) {
    aspectRatioClass = "aspect-square";
  } else if (!isHorizontal) {
    aspectRatioClass = "aspect-[9/16]"; // Ratio vertical
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow p-0",
        isHorizontal ? "aspect-video col-span-2" : "aspect-[4/5]"
      )}
    >
      <CardContent className="p-0 h-full">
        <Link
          href={`/watch?url=${encodeURIComponent(
            fileUrl
          )}&horizontal=${isHorizontal}`}
          className="flex flex-col items-center justify-center gap-2 h-full"
        >
          <ClapperboardIcon className="w-12 h-12 text-gray-500" />
          <p className="text-sm text-gray-500 font-medium">
            {dimensions.duration.toFixed(1)}s
          </p>
        </Link>
      </CardContent>
    </Card>
  );
};

export const ThumbVideoCard = ({ id }: { id: string }) => {
  const { thumbnail, watch, stream } = fileRoutes(id);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    duration: 0,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = thumbnail;
    img.onload = () => {
      setDimensions((prev) => ({
        ...prev,
        width: img.naturalWidth,
        height: img.naturalHeight,
      }));
    };
  }, [thumbnail]);

  useEffect(() => {
    // 1. On crée un élément video
    const video = document.createElement("video");
    video.src = stream;

    // 2. On écoute l'événement 'loadedmetadata'
    const handleMetadataLoaded = () => {
      // 3. On met à jour l'état avec les dimensions
      setDimensions((prev) => ({
        ...prev,
        duration: video.duration,
      }));
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);

    // Fonction de nettoyage pour éviter les fuites de mémoire
    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
    };
  }, [stream]);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div className="aspect-square bg-gray-200 animate-pulse" />;
  }

  const isHorizontal = dimensions.width > dimensions.height;

  return (
    <Card
      className={cn(
        "group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow p-0 border-4 border-white",
        isHorizontal ? "aspect-video col-span-2" : "aspect-[4/5]"
      )}
    >
      <CardContent className="p-0 overflow-hidden relative">
        <div className="overflow-hidden">
          <Link
            href={watch}
            className="block w-full h-full relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <Badge variant={"secondary"}>
                {dimensions.duration.toFixed(1)}s
              </Badge>
            </div>
            <Image
              loader={csapiImageLoader}
              src={thumbnail}
              alt={id}
              className="object-cover"
              width={dimensions.width}
              height={dimensions.height}
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicVideoCard;
