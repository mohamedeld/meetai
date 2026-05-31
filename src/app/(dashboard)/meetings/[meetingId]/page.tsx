import { LoadingState } from "@/components/loading-state";
import { MeetingDetailsView } from "@/modules/meetings/ui/views/meeting-details-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface IMeetingDetailsPage {
  params: Promise<{ meetingId: string }>;
}
const MeetingDetailsPage = async ({ params }: IMeetingDetailsPage) => {
  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Meeting Details loading"
            description="This may take a few seconds"
          />
        }
      >
        <MeetingDetailsView id={meetingId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default MeetingDetailsPage;
