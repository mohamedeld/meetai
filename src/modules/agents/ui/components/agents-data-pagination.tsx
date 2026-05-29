"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "../../hooks/useFilters";

interface IAgentsDataPagination {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}
export const AgentsDataPagination = ({
  page,
  totalPages,
  onPageChange,
}: IAgentsDataPagination) => {
  const [_, setFilter] = useFilters();
  const handlePrev = () => {
    setFilter({
      page: Math.max(1, page - 1),
    });
    onPageChange?.(page);
  };
  const handleNext = () => {
    setFilter({
      page: Math.min(totalPages, page + 1),
    });
    onPageChange?.(page);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1}
          size={"sm"}
          variant={"outline"}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          size={"sm"}
          variant={"outline"}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
