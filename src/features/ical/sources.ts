import { readFile } from "node:fs/promises";

const parseList = (value?: string): string[] =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const getEnvValue = (key: string): string | undefined =>
  process.env[key] ?? (import.meta.env?.[key] as string | undefined);

export const loadIcalSources = async (): Promise<string[]> => {
  const localPaths = parseList(getEnvValue("LOCAL_TEST_ICAL_PATHS"));
  if (localPaths.length > 0) {
    return Promise.all(localPaths.map((path) => readFile(path, "utf8")));
  }

  const urls = [
    ...parseList(getEnvValue("ICAL_SOURCE_URLS")),
    getEnvValue("AIRBNB_ICAL_URL"),
    getEnvValue("BOOKING_ICAL_URL"),
  ].filter(Boolean) as string[];

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
