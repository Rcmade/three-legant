"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getInitials } from "@/lib/utils/stringUtils";
import { Camera } from "lucide-react";
import { userLinksContent } from "@/content/userContent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogOutButton from "../buttons/LogOutButton";

const UserInfoSidebar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

  console.log({ user });
  return (
    <aside className="mx-auto max-h-fit w-[calc(100%-.4rem)] rounded-lg bg-accent px-4 py-12 md:w-80">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image ?? ""} alt={user?.name || "User"} />
            <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
              {getInitials(user?.name ?? "")}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 w-min cursor-pointer rounded-full border border-primary-foreground bg-primary p-1 text-primary-foreground">
            <Camera />
          </span>
        </div>

        <h2 className="text-xl font-semibold">{user?.name}</h2>
      </div>

      <div className="mt-12 flex flex-col gap-8 text-lg font-semibold">
        {userLinksContent.map((u) => (
          <Link
            href={u.href}
            className={cn(
              "border-b border-transparent text-primary/80 hover:border-primary",
              {
                "border-primary text-primary": pathname === u.href,
              },
            )}
            key={u.href}
          >
            {u.text}
          </Link>
        ))}
        {user?.role === "ADMIN" && (
          <Link
            href={"/admin/dashboard"}
            className={
              "border-b border-transparent text-primary/80 hover:border-primary"
              // {
              //   "border-primary text-primary": pathname === "dashboard",
              // },
            }
          >
            Dashboard
          </Link>
        )}
        {user && <LogOutButton />}
      </div>
    </aside>
  );
};

export default UserInfoSidebar;
