import OfferPresentIcon from "@/icons/OfferPresentIcon";
import { ArrowRight, X } from "lucide-react";
import React from "react";
import Container from "../layout/Container";
import Link from "next/link";

function OfferNav() {
  return (
    <>
      {/* Don't change the position of elements */}
      <input type="checkbox" id="close-banner" className="peer hidden" />

      <Container asChild>
        <nav
          className="no-scrollbar flex items-center justify-between overflow-auto whitespace-nowrap bg-accent p-1 text-center text-xs font-semibold peer-checked:hidden sm:text-sm md:text-base"
          aria-live="polite"
        >
          <span aria-hidden="true"></span>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <OfferPresentIcon className="h-4 w-4 md:h-6 md:w-6" />
            <span>30% off storewide — Limited time!</span>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-secondary-blue transition-all hover:border-b hover:border-secondary-blue sm:gap-2"
            >
              Shop Now <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
            </Link>
          </div>
          <label
            aria-label="Close banner"
            role="button"
            tabIndex={0}
            className="cursor-pointer rounded-md border border-transparent px-1 py-1 hover:border hover:border-border"
            htmlFor="close-banner"
          >
            <X className="h-4 w-4 md:h-6 md:w-6" />
          </label>
        </nav>
      </Container>
    </>
  );
}

export default OfferNav;
