"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Fragment, memo, useEffect, useState } from "react";
import { DashboardCommand } from "./dashboard-command";

export const DashboardCommandContainer = memo(() => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);
  return (
    <Fragment>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setOpen((prev) => !prev)}
        className="h-9 w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground "
      >
        <SearchIcon />
        Search
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">&#8984;</span>
        </kbd>
      </Button>
      <DashboardCommand open={open} setOpen={setOpen} />
    </Fragment>
  );
});

DashboardCommandContainer.displayName = "DashboardCommandContainer";
