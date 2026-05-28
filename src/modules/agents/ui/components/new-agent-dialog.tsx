"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AgentForm } from "./agent-form";

interface INewAgentDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewAgentDialog = ({ onOpenChange, open }: INewAgentDialog) => {
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
      />
    </ResponsiveDialog>
  );
};
