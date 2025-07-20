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
  PlayIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { fileTypeByFilename } from "@/lib/utils";
import ImageCard from "@/components/image-card";
import { Fragment } from "react";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const artist = await getArtist((await params).artistId);
  const images = artist.files.filter(
    (file: any) => fileTypeByFilename(file.filename) === "image"
  );
  const videos = artist.files.filter(
    (file: any) => fileTypeByFilename(file.filename) === "video"
  );
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
          src={artistProfileImages(artist).cover}
          alt={`${artist.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage
                src={artistProfileImages(artist).avatar}
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

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 md:text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Joined {artist.joinDate}</span>
                </div>
                {artist.website && (
                  <div className="flex items-center space-x-1">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <span>{artist.website}</span>
                  </div>
                )}
              </div>
            </div>

            <Button className="md:mb-4">Follow</Button>
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

            <div className="flex md:flex-col gap-6 md:gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {images.length + videos.length}
                </div>
                <div className="text-sm text-muted-foreground">Works</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.files.map((file: any) => (
              <Fragment key={file.id}>
                {fileTypeByFilename(file.filename) === "image" && (
                  <ImageCard
                    fileUrl={artistFileURL(artist.id, file.id)}
                    alt={`${artist.name} - ${file.filename}`}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
