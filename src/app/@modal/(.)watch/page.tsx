import { Suspense } from "react";
import { WatchModal } from "./WatchModal";
import { SuspenseLoader } from "@/components/suspense-loader";

export default function ModalItem() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <WatchModal />
    </Suspense>
  );
}
