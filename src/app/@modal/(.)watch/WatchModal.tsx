"use client";

import { WatchInterceptable } from "@/app/watch/WatchInterceptable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fileRoutes } from "@/lib/utils";

export function WatchModal() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const videoID = search.get("v");
  const isHorizontal = Boolean(search.get("horizontal"));

  if (!videoID) {
    return <div>Video ID not found</div>;
  }

  const { stream } = fileRoutes(videoID);

  return (
    <Dialog
      open={pathname === "/watch"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-w-lg">
        <WatchInterceptable videoURL={stream} isHorizontal={isHorizontal} />
      </DialogContent>
    </Dialog>
  );
}
