import { artistProfileImages } from "@/lib/client-api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { Artist } from "@/types/artists";

export async function ArtistCard({ artist }: { artist: Artist }) {
  const profileImages = await artistProfileImages(artist);

  return (
    <Card className="w-full relative bg-black">
      <CardHeader className="z-20">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileImages.avatar} />
            <AvatarFallback>{artist.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">{artist.name}</h2>
        </div>
      </CardHeader>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 w-full rounded-2xl bg-black/75"></div>
      <Image
        src={profileImages.cover}
        alt={artist.name}
        fill
        className="w-full object-cover absolute top-0 left-0 z-0 rounded-2xl"
      />
    </Card>
  );
}
