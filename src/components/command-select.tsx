"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface IProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}
export const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  isSearchable,
  onSearch,
  placeholder,
}: IProps) => {
  const [open, setOpen] = useState(false);
  const selectOption = options?.find((option) => option.value === value);
  const handleClose = (value: boolean) => {
    onSearch?.("");
    setOpen(value);
  };
  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant={"outline"}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectOption && "text-muted-foreground",
          className,
        )}
      >
        <div className="">{selectOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog open={open} onOpenChange={handleClose}>
        <Command>
          <CommandInput placeholder="Search..." onValueChange={onSearch} />
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">
                No options found
              </span>
            </CommandEmpty>
            {options?.map((option) => (
              <CommandItem
                key={option?.id}
                onSelect={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                {option?.children}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </CommandResponsiveDialog>
    </React.Fragment>
  );
};
