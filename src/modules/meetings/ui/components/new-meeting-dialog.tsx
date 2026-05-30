"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { memo } from "react";
import { MeetingGetOne } from "../../types";
import { MeetingForm } from "./meeting-form";

interface INewMeetingDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting?: MeetingGetOne;
}
export const NewMeetingDialog = memo(
  ({ onOpenChange, open, meeting }: INewMeetingDialog) => {
    return (
      <ResponsiveDialog
        title="New Meeting"
        description="Create a new meeting"
        open={open}
        onOpenChange={onOpenChange}
      >
        <MeetingForm
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
          meeting={meeting}
        />
      </ResponsiveDialog>
    );
  },
);

NewMeetingDialog.displayName = "NewMeetingDialog";
