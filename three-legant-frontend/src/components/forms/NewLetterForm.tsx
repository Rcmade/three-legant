import { Mail } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const NewLetterForm = () => {
  return (
    <div className="relative flex min-h-80 md:min-h-[27rem] w-full items-center justify-center bg-[url(/images/banner/Newsletter.png)] bg-cover bg-center bg-no-repeat">
      <form className="flex flex-col items-center gap-4 dark:text-primary-foreground">
        <h1 className="text-4xl font-medium">Join Our Newsletter</h1>
        <p className="text-lg">
          Sign up for deals, new products and promotions
        </p>

        <div className="border-border-secondary/50 flex items-center border-b-2 text-base focus-within:border-primary">
          <Mail className="mr-2 h-10 w-10" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent py-2 focus:border-primary focus:outline-none focus:ring-0"
          />

          <Button
            className="border border-transparent text-base font-medium hover:border-border"
            variant="ghost"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewLetterForm;
