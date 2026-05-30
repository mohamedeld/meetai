import { LoadingState } from "@/components/loading-state";
import { MeetingListHeader } from "@/modules/meetings/ui/components/meeting-list-header";
import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

const MeetingsPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

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
