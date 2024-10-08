import React from "react";
import { Button } from "../ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const CompanySocialButtons = () => {
  return (
    <div className="flex gap-4">
      <Button asChild size="icon" variant="ghost">
        <Link href="/">
          <Instagram />
        </Link>
      </Button>
      <Button asChild size="icon" variant="ghost">
        <Link href="/">
          <Facebook />
        </Link>
      </Button>

      <Button asChild size="icon" variant="ghost">
        <Link href="/">
          <Youtube />
        </Link>
      </Button>
    </div>
  );
};

export default CompanySocialButtons;
