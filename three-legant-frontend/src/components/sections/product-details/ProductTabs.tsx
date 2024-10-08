"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery, useIsMounted } from "usehooks-ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdditionInfo from "./AdditionInfo";
import Qna from "./Qna";
import Reviews from "./Reviews";

const tabs = {
  "Additional Info": <AdditionInfo />,
  Questions: <Qna />,
  Reviews: <Reviews />,
};

const defaultTab: keyof typeof tabs = "Additional Info";

const ProductTabs = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    defaultValue: false,
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      {!isDesktop ? (
        <Accordion
          defaultValue={defaultTab}
          type="single"
          className="md:hidden"
          collapsible
        >
          {Object.keys(tabs).map((item, index) => (
            <AccordionItem key={index} value={item}>
              <AccordionTrigger>{item}</AccordionTrigger>
              <AccordionContent className="px-4">
                {tabs[item as keyof typeof tabs]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Tabs defaultValue={defaultTab} className="hidden md:block">
          <TabsList className="flex w-full justify-start gap-10 rounded-none border-b bg-transparent">
            {Object.keys(tabs).map((item, index) => (
              <TabsTrigger
                key={index}
                value={item}
                className="-mb-2 rounded-none bg-transparent data-[state=active]:border-b data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="my-8 px-4">
            <TabsContent value="Additional Info">
              <AdditionInfo />
            </TabsContent>
            <TabsContent value="Questions">
              <Qna />
            </TabsContent>
            <TabsContent value="Reviews">
              <Reviews />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
};

export default ProductTabs;
