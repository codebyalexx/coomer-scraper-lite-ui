import { Suspense } from "react";
import { WatchModal } from "./WatchModal";
import { SuspenseLoader } from "@/components/suspense-loader";
import ClientGuard from "@/components/client-guard";

export default function ModalItem() {
  return (
    <ClientGuard>
      <Suspense fallback={<SuspenseLoader />}>
        <WatchModal />
      </Suspense>
    </ClientGuard>
  );
}
