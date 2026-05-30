"use client";

import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingFilterContainer } from "./meeting-filter-container";
import { NewMeetingDialog } from "./new-meeting-dialog";

export const MeetingListHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <MeetingFilterContainer />
      </div>
      <NewMeetingDialog open={open} onOpenChange={setOpen} />
    </React.Fragment>
  );
};
