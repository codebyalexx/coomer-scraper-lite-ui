"use client";

import { Artist } from "@/types/artists";
import Link from "next/link";
import { ArtistCard } from "./artist-card";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ArtistsList({ artists }: { artists: Artist[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [orderBy, setOrderBy] = useState(
    searchParams.get("orderBy") || "createdAt-asc"
  );

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-");
    const sort = {
      field,
      direction,
    };
    setOrderBy(value);
  };

  const filteredArtists = artists
    .filter((artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const [field, direction] = orderBy.split("-");
      const aCreatedAt = new Date(a.createdAt);
      const bCreatedAt = new Date(b.createdAt);
      const aUpdatedAt = new Date(a.updatedAt);
      const bUpdatedAt = new Date(b.updatedAt);

      if (field === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (field === "createdAt") {
        return direction === "asc"
          ? aCreatedAt.getTime() - bCreatedAt.getTime()
          : bCreatedAt.getTime() - aCreatedAt.getTime();
      }
      if (field === "updatedAt") {
        return direction === "asc"
          ? aUpdatedAt.getTime() - bUpdatedAt.getTime()
          : bUpdatedAt.getTime() - aUpdatedAt.getTime();
      }
      if (field === "files") {
        return direction === "asc" ? a.files - b.files : b.files - a.files;
      }
      return 0;
    });

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
        <div className="flex items-center justify-between">
          <ArtistOrderBy orderBy={orderBy} setOrderBy={handleSortChange} />
          <div className="w-fit">...</div>
        </div>
      </div>
      {filteredArtists.map((artist: any) => (
        <Link key={artist.id} href={`/artist/${artist.id}`}>
          <ArtistCard artist={artist} />
        </Link>
      ))}
    </div>
  );
}

function ArtistOrderBy({
  orderBy,
  setOrderBy,
}: {
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
}) {
  return (
    <div className="w-fit">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Order by</label>
          <Select defaultValue={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Alphabetical</SelectLabel>
                <SelectItem value="name-asc">Name (A to Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z to A)</SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="createdAt-desc">
                  Created (Newest first)
                </SelectItem>
                <SelectItem value="createdAt-asc">
                  Created (Oldest first)
                </SelectItem>
                <SelectItem value="updatedAt-desc">
                  Updated (Newest first)
                </SelectItem>
                <SelectItem value="updatedAt-asc">
                  Updated (Oldest first)
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="priority-high">
                  Priority (High to Low)
                </SelectItem>
                <SelectItem value="priority-low">
                  Priority (Low to High)
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>File Counts</SelectLabel>
                <SelectItem value="files-desc">
                  Total Files (Most first)
                </SelectItem>
                <SelectItem value="files-asc">
                  Total Files (Least first)
                </SelectItem>
                <SelectItem value="videos-desc">Videos (Most first)</SelectItem>
                <SelectItem value="videos-asc">Videos (Least first)</SelectItem>
                <SelectItem value="images-desc">Images (Most first)</SelectItem>
                <SelectItem value="images-asc">Images (Least first)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
