import { readFile } from "node:fs/promises";

const parseList = (value?: string): string[] =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

export const loadIcalSources = async (): Promise<string[]> => {
  const localPaths = parseList(process.env.LOCAL_TEST_ICAL_PATHS);
  if (localPaths.length > 0) {
    return Promise.all(localPaths.map((path) => readFile(path, "utf8")));
  }

  const urls = [process.env.AIRBNB_ICAL_URL, process.env.BOOKING_ICAL_URL].filter(
    Boolean
  ) as string[];

  if (urls.length === 0) {
    throw new Error("No iCal sources configured.");
  }

  const payloads = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch iCal source: ${url}`);
      }
      return response.text();
    })
  );

  return payloads;
};
