"use client";
import { BanIcon, VideoIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeetingStatus } from "../../types";
import React from "react";

interface IUpcomingState {
  meetingId?: string;
  onCancelMeeting?: () => void;
  isCancelling?: boolean;
  status: "upcoming" | "active" | "completed" | "processing" | "cancelled";
  title: string;
  description: string;
  imageSrc: string;
}
export const UpcomingState = ({
  isCancelling,
  meetingId,
  onCancelMeeting,
  status,
  description,
  imageSrc,
  title,
}: IUpcomingState) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image={imageSrc} title={title} description={description} />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        {status === "active" && (
          <React.Fragment>
            <Button
              variant={"secondary"}
              className="w-full lg:w-auto"
              onClick={onCancelMeeting}
              disabled={isCancelling}
            >
              <BanIcon />
              Cancel Meeting
            </Button>
            <Button
              disabled={!meetingId || isCancelling}
              asChild={true}
              className="w-full lg:w-auto"
            >
              <Link href={`/call/${meetingId}`}>
                <VideoIcon />
                Start Meeting
              </Link>
            </Button>
          </React.Fragment>
        )}
        {status === "upcoming" && (
          <Button asChild className="w-full lg:w-auto">
            <Link href={`/call/${meetingId}`}>
              <VideoIcon />
              Join Meeting
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
