import { ArtistsList } from "@/components/artists-list";
import ClientGuard from "@/components/client-guard";
import { getArtists } from "@/lib/client-api";

export default async function Home() {
  const artists = await getArtists();
  return (
    <>
      <ClientGuard>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <ArtistsList artists={artists} />
          </div>
        </main>
      </ClientGuard>
    </>
  );
}
