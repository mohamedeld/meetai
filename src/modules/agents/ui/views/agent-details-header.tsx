"use client";

import { HeaderBreadcrumb } from "@/components/header-breadcrumb";
import { AgentDropdown } from "./agent-dropdown";

interface IAgentDetailsHeader {
  agentId: string;
  agentName: string;
}
export const AgentDetailsHeader = ({
  agentId,
  agentName,
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
      <AgentDropdown agentId={agentId} agentName={agentName} />
    </div>
  );
};
