"use client";

import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NewAgentDialog } from "../components/new-agent-dialog";
import { AgentGetOne } from "../../types";

export const UpdateAgentDialog = ({ agent }: { agent?: AgentGetOne }) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <PencilIcon className="size-4 text-black" />
        Edit
      </DropdownMenuItem>
      <NewAgentDialog open={open} onOpenChange={setOpen} agent={agent} />
    </React.Fragment>
  );
};
