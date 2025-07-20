import { getArtists } from "@/lib/client-api";
import Link from "next/link";

export default async function Home() {
  const artists = await getArtists();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              ArtistHub
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Feed
              </Link>
              <Link
                href="/discover"
                className="text-sm font-medium hover:text-primary"
              >
                Discover
              </Link>
              <Link
                href="/trending"
                className="text-sm font-medium hover:text-primary"
              >
                Trending
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {artists.map((artist: any) => (
            <Link key={artist.id} href={`/artist/${artist.id}`}>
              <h2 className="text-2xl font-bold">{artist.name}</h2>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
