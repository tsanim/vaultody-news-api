import Router from "koa-router";
import { ROUTES } from "../constants";

const healthCheckRouter = new Router({ prefix: ROUTES.HEALTH_CHECK });

healthCheckRouter.get("/readiness", (ctx) => {
  ctx.body = "Ready and healthy!";
});

export { healthCheckRouter };
