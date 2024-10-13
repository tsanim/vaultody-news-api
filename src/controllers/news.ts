import { Context } from "koa";
import { deleteOne, filterAndSortNews, insertOne } from "../models/news";
import { isNewsBody } from "../types/news";

const insertNews = async (ctx: Context) => {
  if (isNewsBody(ctx.request.body)) {
    const insertedNews = await insertOne(ctx.request.body);
    ctx.status = 201;
    ctx.body = { success: true, data: insertedNews };
    console.log("Successfully added news.");

    return;
  }
  ctx.status = 400;
  ctx.body = { success: false, error: "Invalid request body" };
  console.log("Invalid body for news.");
  return;
};

const deleteNews = async (ctx: Context) => {
  const { id } = ctx.params;
  const deleted = await deleteOne(id);

  if (deleted.deletedCount > 0) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      error: `Successfuly deleted news with id: ${id}`,
    };
    return;
  }
  ctx.status = 404;
  ctx.body = {
    success: false,
    error: `Not found news with id: ${id}`,
  };
  return;
};

const filterNews = async (ctx: Context) => {
  const news = await filterAndSortNews(ctx.query);
  ctx.body = { success: true, data: news };
  return;
};

export { insertNews, deleteNews, filterNews };
