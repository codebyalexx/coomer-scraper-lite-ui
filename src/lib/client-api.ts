import { Artist, ArtistFile, ArtistSpecific } from "@/types/artists";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export async function getArtists(
  {
    offset = 0,
    limit = 15,
  }: {
    offset?: number;
    limit?: number;
  } = { offset: 0, limit: 15 }
): Promise<Artist[]> {
  const response = await fetch(
    `${API_HOST}/api/artists?offset=${offset}&limit=${limit}`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );
  return response.json();
}

export async function getArtist(
  artistId: string,
  {
    fileOffset = 24,
    fileLimit = 24,
    postOffset = 12,
    postLimit = 12,
  }: {
    fileOffset?: number;
    fileLimit?: number;
    postOffset?: number;
    postLimit?: number;
  } = { fileOffset: 24, fileLimit: 24, postOffset: 12, postLimit: 12 }
): Promise<ArtistSpecific> {
  const response = await fetch(
    `${API_HOST}/api/artists/${artistId}?fileOffset=${fileOffset}&fileLimit=${fileLimit}&postOffset=${postOffset}&postLimit=${postLimit}`,
    {
      next: {
        revalidate: 900,
      },
    }
  );
  const json = await response.json();
  return {
    ...json,
    tags: [],
    profileImages: await artistProfileImages(json),
    files: await Promise.all(
      json.files.map(async (file: ArtistFile) => ({
        ...file,
        apiURL: apiFileURL(file.id),
      }))
    ),
  };
}

export function apiFileURL(fileId: string): string {
  return `${API_HOST}/api/files/${fileId}/stream`;
}

export function artistProfileImages(artist: Artist | ArtistSpecific) {
  return {
    avatar: `https://img.coomer.st/icons/${artist.service}/${artist.identifier}`,
    cover: `https://img.coomer.st/banners/${artist.service}/${artist.identifier}`,
  };
}
