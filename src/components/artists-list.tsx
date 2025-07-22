"use client";

import { Artist } from "@/types/artists";
import Link from "next/link";
import { ArtistCard } from "./artist-card";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ArtistsList({ artists }: { artists: Artist[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    router.push(`${pathname}?search=${search}`);
  }, [search]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="md:col-span-2 lg:col-span-3 space-y-2">
        <h1 className="text-2xl font-bold m-0">Browse artists</h1>
        <p className="text-gray-500">{filteredArtists.length} artists found</p>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search artists..."
        />
        <div className="flex items-center justify-between"></div>
      </div>
      {filteredArtists.map((artist: any) => (
        <Link key={artist.id} href={`/artist/${artist.id}`}>
          <ArtistCard artist={artist} />
        </Link>
      ))}
    </div>
  );
}
