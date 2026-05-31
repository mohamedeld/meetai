"use client";

import { HeaderBreadcrumb } from "@/components/header-breadcrumb";
import { MeetingGetOne } from "../../types";
import { MeetingDropdown } from "./meeting-dropdown";

interface IMeetingDetailsHeader {
  meeting?: MeetingGetOne;
}
export const MeetingDetailsHeader = ({ meeting }: IMeetingDetailsHeader) => {
  const items = [
    {
      label: "My Meetings",
      href: "/meetings",
    },
    {
      label: meeting?.name ?? "",
      href: `/meetings/${meeting?.id}`,
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <HeaderBreadcrumb items={items} />
      <MeetingDropdown meeting={meeting} />
    </div>
  );
};
