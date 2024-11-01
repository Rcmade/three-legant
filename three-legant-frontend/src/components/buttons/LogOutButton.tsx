"use client";
import React from "react";
import { Button, ButtonIconProps, ButtonProps } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useAuthorization } from "@/hooks/useAuthorization";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { DEFAULT_LOGOUT_REDIRECT } from "@/config/routesConfig";

interface LogOutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

const LogOutButton = ({ className, ...rest }: LogOutButtonProps) => {
  const { invalidateAuthorization } = useAuthorization();
  return (
    <Button
      onClick={() => {
        signOut({
          redirectTo: DEFAULT_LOGOUT_REDIRECT,
        });
        invalidateAuthorization();
      }}
      variant="destructive-outline"
      {...rest}
    >
      <LogOut /> Logout
    </Button>
  );
};

export default LogOutButton;
