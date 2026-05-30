"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { GenerateAvatar } from "@/components/generate-avatar";
import { ControllerRenderProps } from "react-hook-form";

interface IMeetingSelect {
  field: ControllerRenderProps<
    {
      name: string;
      agentId: string;
    },
    "agentId"
  >;
}

export const MeetingSelect = ({ field }: IMeetingSelect) => {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    }),
  );
  return (
    <CommandSelect
      options={(agents?.data?.items ?? [])?.map((agent) => ({
        id: agent?.id,
        value: agent?.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GenerateAvatar
              seed={agent?.name}
              variant="botttsNeutral"
              className="border size-6"
            />
            <span>{agent?.name}</span>
          </div>
        ),
      }))}
      onSelect={field?.onChange}
      onSearch={setAgentSearch}
      value={field?.value}
      placeholder="Select an agent"
    />
  );
};
