"use client";

import { memo } from "react";
import { XCircleIcon } from "lucide-react";
import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";

export const MeetingFilterContainer = memo(() => {
  //   const [filters, setFilters] = useFilters() !!filters.search;
  const isAnyFilterModified = false;
  const onClearFilters = () => {
    // setFilters({
    //   search: "",
    //   page: DEFAULT_PAGE,
    // });
  };

  return (
    <div className="flex items-center gap-x-2 pl-1">
      {/* <AgentsSearchFilter /> */}
      {isAnyFilterModified && (
        <Button onClick={onClearFilters} variant={"outline"} size={"sm"}>
          <XCircleIcon />
          Clear
        </Button>
      )}
    </div>
  );
});

MeetingFilterContainer.displayName = "MeetingFilterContainer";
