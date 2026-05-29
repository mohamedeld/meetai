"use client";

import { memo } from "react";
import { XCircleIcon } from "lucide-react";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useFilters } from "../../hooks/useFilters";
import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";

export const AgentsFilterContainer = memo(() => {
  const [filters, setFilters] = useFilters();
  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <div className="flex items-center gap-x-2 pl-1">
      <AgentsSearchFilter />
      {isAnyFilterModified && (
        <Button onClick={onClearFilters} variant={"outline"} size={"sm"}>
          <XCircleIcon />
          Clear
        </Button>
      )}
    </div>
  );
});

AgentsFilterContainer.displayName = "AgentsFilterContainer";
