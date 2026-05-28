"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Mohamed" }));
  return <div className="flex flex-col p-4 gap-y-4">{data?.greeting}</div>;
};
