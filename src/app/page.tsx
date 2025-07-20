import { ArtistCard } from "@/components/artist-card";
import { getArtists } from "@/lib/client-api";
import Link from "next/link";

export default async function Home() {
  const artists = await getArtists();
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist: any) => (
              <Link key={artist.id} href={`/artist/${artist.id}`}>
                <ArtistCard artist={artist} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
