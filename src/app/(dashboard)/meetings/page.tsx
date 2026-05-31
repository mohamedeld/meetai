import React, { Suspense } from "react";
import { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { LoadingState } from "@/components/loading-state";
import { MeetingListHeader } from "@/modules/meetings/ui/components/meeting-list-header";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { loadMeetingSearchParams } from "@/modules/meetings/params";

interface IProps {
  searchParams: Promise<SearchParams>;
}
const MeetingsPage = async ({ searchParams }: IProps) => {
  const params = await loadMeetingSearchParams(searchParams);
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...params,
    }),
  );

  return (
    <React.Fragment>
      <MeetingListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Meetings Data loading"
              description="This may take a few seconds"
            />
          }
        >
          <MeetingsView />
        </Suspense>
      </HydrationBoundary>
    </React.Fragment>
  );
};

export default MeetingsPage;
