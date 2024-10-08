import CompanyValueCard from "@/components/cards/CompanyValueCard";
import PrimaryCategoryCard from "@/components/cards/PrimaryCategoryCard";
import ProductCard from "@/components/cards/ProductCard";
import SecondaryCategoryCard from "@/components/cards/SecondaryCategoryCard";
import HeroCarousel from "@/components/carousels/HeroCarousel";
import SimpleUniqueHeader from "@/components/headers/SimpleUniqueHeader";
import Container from "@/components/layout/Container";
import TextWithArrow from "@/components/links/TextWithArrow";
import NewArrivalsSection from "@/components/sections/home/NewArrivalsSection";
import ProductsWithHeadingSection from "@/components/sections/ProductsWithHeadingSection";
import {
  companyValueContent,
  companyValueIconContent,
} from "@/content/companyValueContent";
import Image from "next/image";
import Script from "next/script";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Container className="space-y-6">
        <HeroCarousel />
        <SimpleUniqueHeader />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <PrimaryCategoryCard
            href="/"
            src="/images/products/earphones/boAt Rockerz 258 Pro+ 4.webp"
            title="Headphones"
            className="flex-1"
          />

          <div className="flex flex-1 flex-col gap-4">
            <SecondaryCategoryCard
              href="/"
              src="/images/products/mobile/realme 9i 5G (Soulful Blue, 64 GB) (4 GB RAM) 1.webp"
              title="Headphones"
            />
            <SecondaryCategoryCard
              href="/"
              src="/images/products/camera/DIGITEK® (DTR 260 GT) Gorilla Tripod-Mini 33 CM (13 Inch) Tripod for Mobile Phone with Phone Mount & Remote, Flexible Gorilla Stand for DSLR & Action Cameras 1.jpg"
              title="Headphones"
            />
          </div>
        </div>
        <NewArrivalsSection />

        <div className="flex flex-wrap gap-4">
          {companyValueContent.map((i) => {
            const Icon = companyValueIconContent[i.Icon];
            return (
              <CompanyValueCard
                key={i.title}
                icon={Icon}
                title={i.title}
                sortDesc={i.sortDesc}
              />
            );
          })}
        </div>
      </Container>
      <div className="my-6 space-y-6">
        <div className="flex w-full flex-col gap-y-8 bg-accent sm:flex-row">
          <div className="relative aspect-square overflow-hidden sm:w-1/2 lg:max-h-96">
            <Image
              alt="House img"
              fill
              src={"/images/banner/SofaInCouch.png"}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-4 pl-12 sm:w-1/2">
            <span className="font-medium text-secondary-blue">
              SALE UP TO 35% OFF
            </span>
            <h1 className="flex flex-col text-3xl font-medium">
              HUNDREDS of <span> New lower prices!</span>
            </h1>
            <p className="text-base">
              It&apos;s more affordable than ever to give every room in your
              home a stylish makeover
            </p>
            <TextWithArrow href="/" className="font-medium" title="Shop now" />
          </div>
        </div>
      </div>

      <Script src="https://cdn.jsdelivr.net/gh/Rcmade/scripts@master/dist/carousel.min.js" />
    </>
  );
}
