"use client";

import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingGetOne } from "../../types";

export const UpdateMeetingDialog = ({
  meeting,
}: {
  meeting?: MeetingGetOne;
}) => {
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
      <NewMeetingDialog open={open} onOpenChange={setOpen} meeting={meeting} />
    </React.Fragment>
  );
};
