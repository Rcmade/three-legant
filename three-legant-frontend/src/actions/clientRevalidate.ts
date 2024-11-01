"use server";

import { RevalidationType } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const clientRevalidate = async (
  tagOrPath: string,
  type: RevalidationType,
) => {
  if (type === "tag") {
    revalidateTag(tagOrPath);
  } else {
    revalidatePath(tagOrPath);
  }
};
