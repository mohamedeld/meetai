import React, { Suspense } from "react";
import { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { ListHeader } from "@/modules/agents/ui/components/list-header";
import { loadSearchParams } from "@/modules/agents/params";

interface IProps {
  searchParams: Promise<SearchParams>;
}

const AgentsPage = async ({ searchParams }: IProps) => {
  const params = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...params,
    }),
  );

  return (
    <React.Fragment>
      <ListHeader />
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
    </React.Fragment>
  );
};

export default AgentsPage;
