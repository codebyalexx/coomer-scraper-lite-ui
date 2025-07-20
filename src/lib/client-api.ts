const API_HOST = process.env.API_HOST;

export async function getArtists() {
  const response = await fetch(`${API_HOST}/api/artists`);
  return response.json();
}

export async function getArtist(artistId: string) {
  const response = await fetch(`${API_HOST}/api/artists/${artistId}`);
  const json = await response.json();
  return {
    ...json,
    tags: [],
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
