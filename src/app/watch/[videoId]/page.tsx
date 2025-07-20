"use client";

import { use } from "react";

export default function WatchPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = use(params);

  return <div>WatchPage {videoId}</div>;
}
