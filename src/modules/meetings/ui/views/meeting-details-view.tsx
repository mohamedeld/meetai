"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MeetingDetailsHeader } from "../components/meeting-details-header";
import { UpcomingState } from "../components/upcoming-state";

interface IMeetingDetailsView {
  id: string;
}
export const MeetingDetailsView = ({ id }: IMeetingDetailsView) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id }));
  const isActive = data?.status === "active";
  const isCancelled = data?.status === "cancelled";
  const isCompleted = data?.status === "completed";
  const isProcessing = data?.status === "processing";
  const isUpcoming = data?.status === "upcoming";

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <MeetingDetailsHeader meeting={data} />

      {isActive && (
        <UpcomingState
          title="Meeting is active"
          description="Meeting will end once all participants have left"
          imageSrc="/assets/upcoming.svg"
          status={data?.status}
          meetingId={data?.id}
        />
      )}
      {isUpcoming && (
        <UpcomingState
          title="Not started yet"
          description="Once you start this meeting, a summary will appear here"
          imageSrc="/assets/upcoming.svg"
          status={data?.status}
          meetingId={data?.id}
        />
      )}
      {isCancelled && (
        <UpcomingState
          title="Meeting cancelled"
          description="This meeting was cancelled"
          imageSrc="/assets/cancelled.svg"
          status={data?.status}
        />
      )}
      {isCompleted && (
        <UpcomingState
          title="Meeting completed"
          description="This meeting was complete, a summary will appear soon"
          imageSrc="/assets/processing.svg"
          status={data?.status}
        />
      )}
    </div>
  );
};
