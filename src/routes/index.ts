import Koa from "koa";
import { newsRouter } from "./newsRouter";
import { healthCheckRouter } from "./healthCheck";

const initRoutes = (app: Koa) => {
  return app
    .use(healthCheckRouter.routes())
    .use(newsRouter.routes())
    .use(newsRouter.allowedMethods());
};

export { initRoutes };
