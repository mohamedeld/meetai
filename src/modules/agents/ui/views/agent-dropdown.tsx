"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/useConfirm";
import { UpdateAgentDialog } from "./update-agent-dialog";
import { AgentGetOne } from "../../types";

interface IAgentDropdown {
  agentId: string;
  agentName: string;
  meetingCount: number;
  agent?: AgentGetOne;
}
export const AgentDropdown = ({
  agentId,
  agentName,
  meetingCount,
  agent,
}: IAgentDropdown) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        toast.success("Agent Deleted successfully");
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    }),
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are your sure?",
    `The following action will remove ${meetingCount} associated meetings`,
  );

  const handleDelete = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <React.Fragment>
      <RemoveConfirmation />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild={true}>
          <Button variant={"ghost"}>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <UpdateAgentDialog agent={agent} />
          <DropdownMenuItem onClick={handleDelete}>
            <TrashIcon className="size-4 text-black" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
};
