import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/server/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

const AgentsPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="This may take a few seconds"
          />
        }
      >
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentsPage;
