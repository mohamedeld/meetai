"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface IAgentDropdown {
  agentId: string;
  agentName: string;
}
export const AgentDropdown = ({ agentId, agentName }: IAgentDropdown) => {
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild={true}>
        <Button variant={"ghost"}>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <PencilIcon className="size-4 text-black" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <TrashIcon className="size-4 text-black" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
