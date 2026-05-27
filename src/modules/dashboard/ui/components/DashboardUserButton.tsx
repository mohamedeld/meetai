"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";

import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export const DashboardUserButton = memo(() => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }
  const handleLogout = async () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/sign-in");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-3">
        {data?.user?.image ? (
          <Avatar>
            <AvatarImage src={data?.user?.image} />
          </Avatar>
        ) : (
          <GenerateAvatar
            seed={data?.user?.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data?.user?.name}</p>
          <p className="text-sm truncate w-full">{data?.user?.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data?.user?.name}</span>
            <span className="font-normal text-sm truncate text-muted-foreground">
              {data?.user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={handleLogout}
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

DashboardUserButton.displayName = "DashboardUserButton";
