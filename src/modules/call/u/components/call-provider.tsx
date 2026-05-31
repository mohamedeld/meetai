"use client";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { CallConnect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface IProps {
  meetingId: string;
  meetingName: string;
  streamAPI: string;
}

export const CallProvider = ({ meetingId, meetingName, streamAPI }: IProps) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }
  return (
    <CallConnect
      meetingId={meetingId}
      userId={data?.user?.id}
      meetingName={meetingName}
      userName={data?.user?.name}
      userImg={
        data?.user?.image ??
        generateAvatarUri({ seed: data?.user?.name, variant: "initials" })
      }
      streamAPI={streamAPI}
    />
  );
};
