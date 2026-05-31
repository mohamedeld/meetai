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
import { MeetingGetOne } from "../../types";
import { useConfirm } from "@/modules/agents/hooks/useConfirm";
import { UpdateMeetingDialog } from "./update-meeting-dialog";

interface IMeetingDropdown {
  meeting?: MeetingGetOne;
}
export const MeetingDropdown = ({ meeting }: IMeetingDropdown) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        toast.success("Meeting Deleted successfully");
        router.push("/meetings");
      },
      onError: (error) => {
        console.log("err", error);
        toast.error(error?.message);
      },
    }),
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are your sure?",
    `The following action will remove  associated meetings`,
  );

  const handleDelete = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meeting?.id ?? "" });
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
          <UpdateMeetingDialog meeting={meeting} />
          <DropdownMenuItem onClick={handleDelete}>
            <TrashIcon className="size-4 text-black" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
};
