"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { getArtist, toggleArtistException } from "@/lib/client-api";
import { cn } from "@/lib/utils";
import { CheckCheckIcon, Loader2Icon, XCircleIcon } from "lucide-react";

export const ToggleArtistExceptionBtn = ({
  artistId,
}: {
  artistId: string;
}) => {
  const [isLoading, startTransition] = useTransition();
  const [isException, setIsException] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      try {
        const artist = await getArtist(artistId);
        setIsException(artist.isException);
      } catch (error) {
        console.error(error);
        alert("Error occured getting artist. Code 2");
      }
    });
  }, [artistId]);

  const toggleException = async () => {
    startTransition(async () => {
      try {
        await toggleArtistException(artistId, !isException);
        setIsException(!isException);
      } catch (error) {
        console.error(error);
        alert("Error occured toggling exception. Code 3");
      }
    });
  };

  return (
    <Button
      onClick={toggleException}
      className={cn(
        "",
        isLoading && "loading!",
        !isException && "bg-red-500",
        isException && "bg-green-500"
      )}
    >
      {isException && !isLoading ? "Exception" : "Not Exception"}
      {isException && !isLoading ? <CheckCheckIcon /> : <XCircleIcon />}
      {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
      {isLoading && "Loading..."}
    </Button>
  );
};
