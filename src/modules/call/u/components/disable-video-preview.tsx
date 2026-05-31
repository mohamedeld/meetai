"use client";

import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";

export const DisableVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user?.name ?? "",
          image:
            data?.user?.image ??
            generateAvatarUri({
              seed: data?.user?.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

export const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      Please grant your browser a permission to access your camera and
      microphone.
    </p>
  );
};
