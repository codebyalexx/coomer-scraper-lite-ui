"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ClapperboardIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

const DynamicVideoCard = ({
  fileUrl,
  videoId,
}: {
  fileUrl: string;
  videoId: string;
}) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
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
      <div className="w-full aspect-video bg-gray-200 rounded-md animate-pulse" />
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
          href={`/watch/${videoId}`}
          className="flex items-center justify-center h-full"
        >
          <ClapperboardIcon className="w-12 h-12 text-gray-500" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default DynamicVideoCard;
