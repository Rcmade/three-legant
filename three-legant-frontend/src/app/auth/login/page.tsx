"use client";
import React from "react";
import LoginButton from "@/components/buttons/LoginButton";
import { homeUrl } from "@/config/routesConfig";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export const dynamic = 'force-dynamic'
const Page = ({ ...rest }: PageProps) => {
  const callbackUrl = (rest?.searchParams?.callbackUrl || homeUrl) as string;
  const searchParamsStr = createQueryString(rest?.searchParams, {
    callbackUrl: "",
  });

  return (
    <>
      <LoginButton />;
      <RevokeLogin
        searchParamsStr={searchParamsStr}
        callbackUrl={callbackUrl}
      />
    </>
  );
};

const RevokeLogin = ({
  callbackUrl,
  searchParamsStr,
}: {
  callbackUrl: string;
  searchParamsStr: string;
}) => {
  useEffect(() => {
    signIn("rauth", {
      callbackUrl: `${callbackUrl}${searchParamsStr}`,
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
export default Page;
