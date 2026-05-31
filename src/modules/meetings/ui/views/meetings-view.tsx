"use client";

import { DataTable } from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { columns } from "../components/meeting-columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingFilters } from "../../hooks/use-meeting-filter";
import { AgentsDataPagination } from "@/modules/agents/ui/components/agents-data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filter] = useMeetingFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filter,
    }),
  );
  return (
    <div className="overflow-x-auto flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data?.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row?.id}`)}
      />
      <AgentsDataPagination page={filter?.page} totalPages={data?.totalPages} />
      {data?.items?.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};
