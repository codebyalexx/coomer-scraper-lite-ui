import { Loader2Icon } from "lucide-react";

export function SuspenseLoader() {
  return (
    <div className="p-4 flex items-center gap-2">
      <Loader2Icon className="animate-spin w-4 h-4" />
      <p className="text-sm">Loading...</p>
    </div>
  );
}
