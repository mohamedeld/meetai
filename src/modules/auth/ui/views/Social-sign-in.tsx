"use client";

import React, { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const SocialSignIn = memo(() => {
  const [loading, setLoading] = useState(false);
  const handleSocialSignIn = async (provider: string) => {
    setLoading(true);
    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess() {
          setLoading(false);
        },
        onError(ctx) {
          setLoading(false);
        },
      },
    );
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        disabled={loading}
        variant="outline"
        type="button"
        className="w-full"
        onClick={() => handleSocialSignIn("google")}
      >
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        disabled={loading}
        onClick={() => handleSocialSignIn("github")}
      >
        Github
      </Button>
    </div>
  );
});

SocialSignIn.displayName = "SocialSignIn";
