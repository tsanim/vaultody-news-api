import { getNewsCursor } from "./dbConnection";
import { isMongoSort, News, NewsBody, NewsFilter } from "../types/news";
import { ObjectId } from "mongodb";
import { isEmpty } from "ramda";

const isValidId = (id: string) => ObjectId.isValid(id);
const getNews = async (): Promise<News[]> =>
  getNewsCursor().find<News>({}).toArray();

const insertOne = async (news: NewsBody) =>
  getNewsCursor().insertOne({ ...news, date: new Date() });
const deleteOne = async (id: string) =>
  getNewsCursor().deleteOne({ _id: new ObjectId(id) });

const filterAndSortNews = async (filter: Partial<NewsFilter>) => {
  const { title, sortByTitle, sortByDate, startDate, endDate } = filter;
  // Known that $text $search is not quering less than 5-7 characters
  const maybeTitleSearch = title ? { $text: { $search: title } } : {};
  const maybeStartDateFilter = startDate ? { $gte: new Date(startDate) } : {};
  const maybeEndDateFilter = endDate ? { $lte: new Date(endDate) } : {};
  const maybeDateSearch =
    isEmpty(maybeStartDateFilter) && isEmpty(maybeEndDateFilter)
      ? {}
      : { date: { ...maybeStartDateFilter, ...maybeEndDateFilter } };
  const query = {
    ...maybeTitleSearch,
    ...maybeDateSearch,
  };
  const maybeSortDate = sortByDate ? { date: sortByDate } : {};
  const maybeSortTitle = sortByTitle ? { title: sortByTitle } : {};
  const sort = { ...maybeSortTitle, ...maybeSortDate };

  return isMongoSort(sort)
    ? getNewsCursor().find(query).sort(sort).toArray()
    : getNewsCursor().find(query).toArray();
};

export { getNews, filterAndSortNews, insertOne, deleteOne, isValidId };
