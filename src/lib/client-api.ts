const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export async function getArtists() {
  const response = await fetch(`${API_HOST}/api/artists`, {
    next: {
      revalidate: 1800,
    },
  });
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
) {
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
      json.files.map(async (file: any) => ({
        ...file,
        apiURL: await artistFileURL(json.id, file.id),
      }))
    ),
  };
}

export function artistFileURL(artistId: string, fileId: string): string {
  return `${API_HOST}/api/artists/${artistId}/filestream/${fileId}`;
}

export function artistProfileImages(artist: any) {
  return {
    avatar: `https://img.coomer.su/icons/${artist.service}/${artist.identifier}`,
    cover: `https://img.coomer.su/banners/${artist.service}/${artist.identifier}`,
  };
}
