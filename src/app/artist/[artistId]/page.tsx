"use client";

import {
  artistFileURL,
  artistProfileImages,
  getArtist,
} from "@/lib/client-api";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarIcon,
  ExternalLinkIcon,
  MapPinIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fileTypeByFilename } from "@/lib/utils";
import ImageCard from "@/components/image-card";
import { Fragment, use, useEffect, useRef, useState } from "react";
import DynamicVideoCard from "@/components/video-card";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ArtistPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = use(params);

  const loaderRef = useRef(null);

  const fileLimit = 24;

  const [fileOffsetState, setFileOffsetState] = useState(0);
  const [artist, setArtist] = useState<any>(null);

  const fetchArtist = () => {
    getArtist(artistId, {
      fileOffset: fileOffsetState,
      fileLimit,
    }).then((data: any) => {
      if (artist) {
        setArtist({
          ...data,
          files: [...artist.files, ...data.files],
        });
      } else setArtist(data);
    });
  };

  useEffect(() => {
    fetchArtist();
  }, [fileOffsetState, artistId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log("Loading more...");
          setFileOffsetState((prev) => prev + fileLimit);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [loaderRef]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Feed</span>
              </Link>
            </div>
            <Link href="/" className="text-xl font-bold">
              ArtistHub
            </Link>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={artist.profileImages.cover}
          alt={`${artist.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage
                src={artist.profileImages.avatar}
                alt={artist.name}
              />
              <AvatarFallback className="text-2xl">
                {artist.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-foreground">
                  {artist.name}
                </h1>
                <p className="text-lg text-white/80 md:text-muted-foreground">
                  {artist.username}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 md:text-muted-foreground"></div>
            </div>
          </div>

          {/* Stats and Bio */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {artist.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {artist.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <InfiniteScroll
              dataLength={artist.files.length}
              hasMore={true}
              next={() => {
                setFileOffsetState((prev) => prev + fileLimit);
              }}
              loader={<div>Loading...</div>}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {artist.files.map((file: any) => (
                <Fragment key={file.id}>
                  {fileTypeByFilename(file.filename) === "image" && (
                    <ImageCard
                      fileUrl={file.apiURL}
                      alt={`${artist.name} - ${file.filename}`}
                    />
                  )}
                  {fileTypeByFilename(file.filename) === "video" && (
                    <DynamicVideoCard fileUrl={file.apiURL} />
                  )}
                </Fragment>
              ))}
              <div style={{ height: "300px" }}></div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
