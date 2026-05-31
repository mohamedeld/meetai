"use client";

import { memo } from "react";
import { XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingsSearchFilter } from "./meeting-search-filter";
import { useMeetingFilters } from "../../hooks/use-meeting-filter";
import { DEFAULT_PAGE } from "@/constants";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingFilterContainer = memo(() => {
  const [filters, setFilters] = useMeetingFilters();
  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
      agentId: "",
      status: null,
    });
  };

  return (
    <ScrollArea>
      <div className="flex items-center gap-x-2 pl-1">
        <MeetingsSearchFilter />
        <StatusFilter />
        <AgentIdFilter />
        {isAnyFilterModified && (
          <Button onClick={onClearFilters} variant={"outline"} size={"sm"}>
            <XCircleIcon />
            Clear
          </Button>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

MeetingFilterContainer.displayName = "MeetingFilterContainer";
