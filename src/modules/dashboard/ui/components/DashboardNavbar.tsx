"use client";
import { LucidePanelLeftClose, PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommandContainer } from "./dashboard-command-container";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  return (
    <nav className="flex px-4 bg-background items-center gap-x-2 py-3 border-b">
      <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
        {state === "collapsed" || isMobile ? (
          <PanelLeftIcon className="size-4" />
        ) : (
          <LucidePanelLeftClose className="size-4" />
        )}
      </Button>
      <DashboardCommandContainer />
    </nav>
  );
};

export default DashboardNavbar;
