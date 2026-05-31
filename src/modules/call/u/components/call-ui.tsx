"use client";

import { useCall } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { CallLooby } from "./looby";
import { CallActive } from "./call-active";
interface Props {
  meetingName: string;
}
export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const handleJoin = async () => {
    if (!call) return;

    await call?.join();
    setShow("call");
  };
  const handleLeave = async () => {
    if (!call) return;

    await call?.endCall();
    setShow("ended");
  };

  return (
    <div className="h-full">
      {show === "lobby" && <CallLooby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive meetingName={meetingName} onLeave={handleLeave} />
      )}
      {show === "ended" && <p>ended</p>}
    </div>
  );
};
