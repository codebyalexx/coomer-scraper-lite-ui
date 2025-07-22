"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Authentication() {
  const handleGithubLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });

    if (data.error) {
      alert(data.error);
      console.error(data.error);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="p-4 py-12 w-full flex items-center justify-center">
      <Card className="w-full max-w-80">
        <CardContent>
          <CardHeader>
            <h1 className="text-2xl font-semibold">Authentication</h1>
          </CardHeader>
          <div className="p-4">
            <Button className="w-full" onClick={handleGithubLogin}>
              <GithubIcon /> Sign in using Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
