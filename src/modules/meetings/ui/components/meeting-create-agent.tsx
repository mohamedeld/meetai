"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

export const MeetingCreateAgent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-sm text-muted-foreground">
        Not found what you&apos;re looking for?{" "}
      </span>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        className="text-primary hover:underline hover:bg-transparent w-fit"
        variant={"ghost"}
      >
        Create new agent
      </Button>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};
