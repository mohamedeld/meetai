import React, { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
const CallLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/sign-in");
  }
  return <div className="h-screen bg-black">{children}</div>;
};

export default CallLayout;
