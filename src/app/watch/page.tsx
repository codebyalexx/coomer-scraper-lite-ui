"use client";

import { useSearchParams } from "next/navigation";
import { WatchInterceptable } from "./WatchInterceptable";
import { Suspense } from "react";
import { SuspenseLoader } from "@/components/suspense-loader";

export default function WatchPage() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
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
