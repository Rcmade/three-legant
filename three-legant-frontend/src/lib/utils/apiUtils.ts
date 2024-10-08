export const fetcher = async (url: string, req?: RequestInit) => {
  const res = await fetch(url, {
    ...req,
    credentials: "include",
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from the response body
    throw errorData;
  }
  return res.json();
};
