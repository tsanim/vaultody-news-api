import { Sort } from "mongodb";

interface News {
  id: string;
  date: string;
  title: string;
  description?: string;
  text: string;
}

const isMongoSort = (obj: any): obj is Sort => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return false; // Must be a non-null object
  }

  for (const key in obj) {
    const value = obj[key];
    if (value !== 1 && value !== -1 && value !== "asc" && value !== "desc") {
      return false; // Sort values must be 1, -1, 'asc', or 'desc'
    }
  }

  return true;
};

type NewsBody = Omit<News, "id" | "date">;

const isNewsBody = (body: unknown): body is NewsBody =>
  typeof body === "object" &&
  body !== null &&
  "title" in body &&
  typeof (body as NewsBody).title === "string" &&
  "text" in body &&
  typeof (body as NewsBody).text === "string";

type SortBy = "asc" | "desc";

interface NewsFilter {
  title: string;
  sortByTitle: SortBy;
  sortByDate: SortBy;
  startDate: string;
  endDate: string;
}

export { News, NewsBody, SortBy, NewsFilter, isMongoSort, isNewsBody };
