import Joi from "joi";
import { Next, Context } from "koa";
import { isValidId } from "../models/news";

const querySchema = Joi.object({
  title: Joi.string().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  sortByTitle: Joi.string().valid("asc", "desc").optional(),
  sortByDate: Joi.string().valid("asc", "desc").optional(),
});

const newsSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  text: Joi.string().required().messages({
    "string.empty": "Text is required",
    "any.required": "Text is required",
  }),
  date: Joi.date().optional(),
  shortDescription: Joi.string().optional(),
});

const validateNews = (body: unknown) => {
  const { error } = newsSchema.validate(body, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }

  return [];
};

const newsValidator = async (ctx: Context, next: Next) => {
  const validationErrors = validateNews(ctx.request.body);

  if (validationErrors.length !== 0) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: validationErrors.join(", "),
    };
    console.log("Invalid body for news.");
    return;
  } else {
    await next();
  }
};

const objectIdValidator = async (ctx: Context, next: Next) => {
  const { id } = ctx.params;

  if (!id || !isValidId(id) || id.length !== 24) {
    ctx.status = 400;
    ctx.body = { error: "Invalid ObjectID format" };
    return;
  }

  await next();
};

const filterValidator = async (ctx: any, next: any) => {
  const { error } = querySchema.validate(ctx.query);
  if (error) {
    ctx.status = 400;
    ctx.body = { error: error.details[0].message };
    return;
  }
  await next();
};

export { newsValidator, objectIdValidator, filterValidator };
