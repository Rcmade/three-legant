import React from "react";
import Container from "@/components/layout/Container";
import LogoButton from "../buttons/LogoButton";
import MainNavLinks from "../lists/MainNavLinks";
import { webName } from "@/constant";
import Link from "next/link";
import CompanySocialButtons from "../buttons/CompanySocialButtons";

const MainFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground dark:bg-primary-foreground dark:text-primary">
      <Container>
        <nav className="flex flex-col items-center justify-between border-b border-border/50 py-14 dark:border-primary/50 md:flex-row">
          <h1 className="flex  gap-6 flex-col items-center justify-center md:flex-row">
            <span className="">
              <LogoButton />.
            </span>
            <span className="md:h-6 md:w-[1px] w-6 h-[1px] bg-white"></span>
            <span className="">Gift & Decoration Store</span>
          </h1>

          <div className="flex flex-col items-center gap-6 md:flex-row">
            <MainNavLinks
              className="border-none text-white hover:text-white/50"
              activeClassName="text-white/50"
            />
          </div>
        </nav>
        <div className="flex flex-col-reverse items-center justify-between gap-6 py-4 md:flex-row">
          <div className="flex flex-col-reverse gap-6 md:flex-row">
            <h1>
              Copyright © {new Date().getFullYear()} {webName}. All rights
              reserved
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                className="whitespace-nowrap font-semibold hover:text-white/50"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>

              <Link
                className="whitespace-nowrap font-semibold hover:text-white/50"
                href="/terms-of-use"
              >
                Terms of Use
              </Link>
            </div>
          </div>

          <CompanySocialButtons />
        </div>
      </Container>
    </footer>
  );
};

export default MainFooter;
