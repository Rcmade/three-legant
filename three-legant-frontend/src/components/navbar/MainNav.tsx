import React from "react";
import LogoButton from "@/components/buttons/LogoButton";
import MainNavLinks from "@/components/lists/MainNavLinks";
import MainNavUserLinks from "@/components/lists/MainNavUserLinks";
import MainSidebar from "@/components/sidebar/MainSidebar";
import Container from "../layout/Container";

const MainNav = () => {
  return (
    <header className="border py-4">
      <Container asChild>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MainSidebar />
            <LogoButton />
          </div>
          <div className="hidden gap-x-12 md:flex">
            <MainNavLinks />
          </div>
          <MainNavUserLinks />
        </nav>
      </Container>
    </header>
  );
};

export default MainNav;
