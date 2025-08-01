import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileTypeByFilename(filename: string): string {
  const extension = filename.split(".").pop() || "";
  switch (extension) {
    case "png":
      return "image";
    case "jpg":
      return "image";
    case "jpeg":
      return "image";
    case "gif":
      return "image";
    case "webp":
      return "image";
    case "mp4":
      return "video";
    case "webm":
      return "video";
    case "mkv":
      return "video";
    case "mp3":
      return "audio";
    case "wav":
      return "audio";
    default:
      return "unknown";
  }
}

export function fileRoutes(id: string) {
  return {
    infos: `${process.env.NEXT_PUBLIC_API_HOST}/api/files/${id}`,
    stream: `${process.env.NEXT_PUBLIC_API_HOST}/api/files/${id}/stream`,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}/api/files/${id}/thumbnail`,
    watch: `/watch?v=${id}`,
  };
}
