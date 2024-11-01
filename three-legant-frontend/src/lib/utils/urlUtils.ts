// Client only function which replace the history
export function updateSearchParams(key: string, value: string): void {
  const url = new URL(window.location.href); // Create a new URL object from the current URL

  // Set the search parameter with the provided key and value
  url.searchParams.set(key, value);

  // Replace the current state in the browser history without reloading the page
  window.history.replaceState(null, "", url);
}
