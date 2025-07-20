import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export function WatchInterceptable({
  videoURL,
  isHorizontal,
}: {
  videoURL: string;
  isHorizontal: boolean;
}) {
  return (
    <ReactPlayer
      src={videoURL}
      controls
      loop
      width={"100%"}
      height={"100%"}
      className={cn(
        "rounded-lg max-h-[calc(70vh)]",
        isHorizontal ? "w-full h-auto" : "h-full w-auto"
      )}
    />
  );
}
