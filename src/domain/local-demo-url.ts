/** Accept only explicit HTTP loopback demos, never a public host or embedded credential. */
export const parseLocalDemoUrl = (value: string): string => {
  const url = new URL(value);
  if (
    url.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Local demos require an HTTP loopback URL without credentials, query or fragment",
    );
  }
  return url.href;
};
