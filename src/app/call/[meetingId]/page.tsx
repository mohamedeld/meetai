import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { LoadingState } from "@/components/loading-state";
import { CallView } from "@/modules/call/u/views/call-view";

interface ICallMeetingPage {
  params: Promise<{ meetingId: string }>;
}
const CallMeetingPage = async ({ params }: ICallMeetingPage) => {
  const { meetingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    }),
  );
  const streamVideoAPIKey = process.env.STREAM_API_KEY;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meeting Call"
            description="This may take a few seconds"
          />
        }
      >
        <CallView meetingId={meetingId} streamAPI={streamVideoAPIKey ?? ""} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CallMeetingPage;
