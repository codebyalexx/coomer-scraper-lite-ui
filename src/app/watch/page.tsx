"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function WatchPage() {
  const search = useSearchParams();
  const videoURL = search.get("url");
  const isHorizontal = Boolean(search.get("horizontal"));

  if (!videoURL) {
    return <div>Video URL not found</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 relative z-10">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    </>
  );
}
