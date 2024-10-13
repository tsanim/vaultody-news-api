import { Context, Next } from "koa";

const requestLogger = async (ctx: Context, next: Next) => {
  const start = Date.now();

  console.log(`${ctx.method} ${ctx.url}`);

  await next();

  const ms = Date.now() - start;

  console.log(`${ctx.method} ${ctx.url} - ${ctx.status} ${ms}ms`);
};

export { requestLogger };
