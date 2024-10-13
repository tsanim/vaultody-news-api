import Router from "koa-router";
import { ROUTES } from "../constants";
import {
  filterValidator,
  newsValidator,
  objectIdValidator,
} from "../middlewares/news";
import { deleteNews, insertNews, filterNews } from "../controllers/news";

const newsRouter = new Router({ prefix: ROUTES.NEWS });

newsRouter.get("/filter", filterValidator, filterNews);
newsRouter.post("/", newsValidator, insertNews);
newsRouter.delete("/:id", objectIdValidator, deleteNews);

export { newsRouter };
