"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";

export default function ClientGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <Loader2Icon className="animate-spin w-8 h-8" />
      </div>
    );

  if (!session)
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="text-lg font-semibold">Unauthorized</p>
      </div>
    );

  return <>{children}</>;
}
