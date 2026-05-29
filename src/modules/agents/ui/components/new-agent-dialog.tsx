"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";
import { memo } from "react";

interface INewAgentDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: AgentGetOne;
}
export const NewAgentDialog = memo(
  ({ onOpenChange, open, agent }: INewAgentDialog) => {
    return (
      <ResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={onOpenChange}
      >
        <AgentForm
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
          agent={agent}
        />
      </ResponsiveDialog>
    );
  },
);

NewAgentDialog.displayName = "NewAgentDialog";
