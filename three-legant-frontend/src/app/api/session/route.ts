import { buildCookieString } from "@/lib/utils/stringUtils";
import { cookies } from "next/headers";

export const GET = (): Response => {
  try {
    const mergedCookies = cookies()
      .getAll()
      .reduce((acc, c) => ({ ...acc, [c.name]: c.value }), {});
    const cookieString = buildCookieString(mergedCookies);

    return Response.json({ Authorization: cookieString });
  } catch (error) {
    // Handle potential errors
    return Response.json({ error: "Failed to retrieve cookies" }, { status: 500 });
  }
};


