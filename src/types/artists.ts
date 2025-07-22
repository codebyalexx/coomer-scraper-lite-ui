// The artist from /api/artists
export interface Artist {
  id: string;
  url: string;
  name: string;
  identifier: string;
  service: "onlyfans" | "fansly";
  isException: boolean;
  createdAt: Date;
  updatedAt: Date;
  posts: number;
  files: number;
}

// The artist from api/artists/:id
export interface ArtistSpecific extends Omit<Artist, "posts" | "files"> {
  posts: ArtistPost[];
  files: ArtistFile[];
  tags: string[];
  profileImages: {
    avatar: string;
    cover: string;
  };
}

// The artist post item
export interface ArtistPost {
  id: string;
  identifier: string;
  artistId: string;
}

// The artist file item
export interface ArtistFile {
  id: string;
  url: string;
  apiURL?: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  artistId: string;
}
