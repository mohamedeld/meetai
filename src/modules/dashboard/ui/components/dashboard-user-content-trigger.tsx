"use client";

import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

interface IProps {
  image?: string;
  name?: string;
  email?: string;
}
export const DashboardUserContentTrigger = ({ image, name, email }: IProps) => {
  return (
    <React.Fragment>
      {image ? (
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
      ) : (
        <GenerateAvatar
          seed={name ?? ""}
          variant="initials"
          className="size-9 mr-3"
        />
      )}
      <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
        <p className="text-sm truncate w-full">{name}</p>
        <p className="text-sm truncate w-full">{email}</p>
      </div>
      <ChevronDownIcon className="size-4 shrink-0" />
    </React.Fragment>
  );
};
