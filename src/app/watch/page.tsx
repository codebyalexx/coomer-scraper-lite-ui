"use client";

import { useSearchParams } from "next/navigation";
import { WatchInterceptable } from "./WatchInterceptable";

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
          <WatchInterceptable videoURL={videoURL} isHorizontal={isHorizontal} />
        </div>
      </div>
    </>
  );
}
