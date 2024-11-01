export const fetcher = async (url: string, req?: RequestInit | null) => {
  const res = await fetch(url, {
    credentials: "include",
    next: {
      revalidate: 30,
    },
    ...req,
  });

  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from the response body
    throw errorData;
  }
  return res.json();
};
