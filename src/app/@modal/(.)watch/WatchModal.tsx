"use client";

import { WatchInterceptable } from "@/app/watch/WatchInterceptable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function WatchModal() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const videoURL = search.get("url");
  const isHorizontal = Boolean(search.get("horizontal"));

  if (!videoURL) {
    return <div>Video URL not found</div>;
  }

  return (
    <Dialog
      open={pathname === "/watch"}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-w-lg">
        <WatchInterceptable videoURL={videoURL} isHorizontal={isHorizontal} />
      </DialogContent>
    </Dialog>
  );
}
