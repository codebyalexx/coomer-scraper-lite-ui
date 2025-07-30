"use client";

import { useSearchParams } from "next/navigation";
import { WatchInterceptable } from "./WatchInterceptable";
import { Suspense } from "react";
import { SuspenseLoader } from "@/components/suspense-loader";
import ClientGuard from "@/components/client-guard";
import { fileRoutes } from "@/lib/utils";

export default function WatchPage() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const search = useSearchParams();
  const videoID = search.get("v");
  const isHorizontal = Boolean(search.get("horizontal"));

  if (!videoID) {
    return <div>Video ID not found</div>;
  }

  const { stream } = fileRoutes(videoID);

  return (
    <>
      <ClientGuard>
        <div className="container mx-auto p-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <WatchInterceptable videoURL={stream} isHorizontal={isHorizontal} />
          </div>
        </div>
      </ClientGuard>
    </>
  );
}
