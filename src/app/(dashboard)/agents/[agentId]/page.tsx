import { LoadingState } from "@/components/loading-state";
import { AgentDetailsView } from "@/modules/agents/ui/views/agent-details-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface IAgentDetailsPage {
  params: Promise<{ agentId: string }>;
}
const AgentDetailsPage = async ({ params }: IAgentDetailsPage) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Agent Details loading"
            description="This may take a few seconds"
          />
        }
      >
        <AgentDetailsView id={agentId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentDetailsPage;
