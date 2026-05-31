"use client";

import { useTRPC } from "@/trpc/client";
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CallUI } from "./call-ui";

interface ICallConnect {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImg: string;
  streamAPI: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userImg,
  userName,
  streamAPI,
}: ICallConnect) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  // State drives rendering — refs guard against Strict Mode double-invocation
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  // Tracks whether the effect already ran to prevent duplicate SDK instances
  const clientCreated = useRef(false);

  useEffect(() => {
    // Strict Mode runs effects twice in dev — skip the second run
    if (clientCreated.current) return;
    clientCreated.current = true;

    const _client = new StreamVideoClient({
      apiKey: streamAPI,
      user: { id: userId, name: userName, image: userImg },
      tokenProvider: generateToken,
    });

    setClient(_client);

    return () => {
      _client.disconnectUser();
      setClient(null);
      clientCreated.current = false;
    };
    // generateToken is a stable mutateAsync ref — omitting it is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamAPI, userId, userName, userImg]);

  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();

    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
      }
      setCall(null);
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
