"use client";
import IconWithCircle from "@/icons/IconWithCircle";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import NavLink from "./NavLink";
import { wait } from "@/lib/utils/testUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { userBasicInfoApi } from "@/constant/apiRoute";
import { UserBasicInfoResponseT } from "@/types/apiResponse";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserBasicInfo } from "@/query/user";

interface CartLinkProps {
  varient?: "nav" | "sidebar";
  pathName?: string;
}
const CartLink = ({ varient = "nav", pathName = "" }: CartLinkProps) => {
  const user = useCurrentUser();
  const { data } = useQuery<UserBasicInfoResponseT>({
    queryKey: [userBasicInfoApi],
    queryFn: getUserBasicInfo,
    enabled: false,
  });
  return varient === "nav" ? (
    <Link href="/user/cart">
      <IconWithCircle Icon={ShoppingBagIcon} text={data?.cartCount || 0} />
    </Link>
  ) : (
    <NavLink href={"/user/cart"} name={"Cart"} pathName={pathName}>
      <IconWithCircle Icon={ShoppingBagIcon} text={data?.cartCount || 0} />
    </NavLink>
  );
};

export default CartLink;
