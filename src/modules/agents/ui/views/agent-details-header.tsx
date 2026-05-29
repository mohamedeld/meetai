"use client";

import { HeaderBreadcrumb } from "@/components/header-breadcrumb";
import { AgentDropdown } from "./agent-dropdown";
import { AgentGetOne } from "../../types";

interface IAgentDetailsHeader {
  agentId: string;
  agentName: string;
  meetingCount: number;
  agent?: AgentGetOne;
}
export const AgentDetailsHeader = ({
  agentId,
  agentName,
  meetingCount,
  agent,
}: IAgentDetailsHeader) => {
  const items = [
    {
      label: "My Agents",
      href: "/agents",
    },
    {
      label: agentName,
      href: `/agents/${agentId}`,
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <HeaderBreadcrumb items={items} />
      <AgentDropdown
        agentId={agentId}
        agentName={agentName}
        meetingCount={meetingCount}
        agent={agent}
      />
    </div>
  );
};
