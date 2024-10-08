import { CircleUser, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import CartLink from "../links/CartLink";
import { currentUser } from "@/actions/currentUser";

const MainNavUserLinks = async () => {
  // const user = await currentUser();
  return (
    <div className="flex items-center gap-4">
      <Link href="/search" className="hidden cursor-pointer md:block">
        <Search className="h-7 w-7" />
      </Link>
      <Link href="/user/my-account" className="hidden md:block">
        <CircleUser className="h-7 w-7" />
      </Link>
      <CartLink />
    </div>
  );
};

export default MainNavUserLinks;
