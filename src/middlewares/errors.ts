import { Context, Next } from "koa";

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      ctx.status = 500;
      ctx.body = {
        sucess: false,
        error: err.message || "Internal Server Error",
      };
      console.log("Error occurred:", err.stack);
    } else {
      ctx.status = 500;
      ctx.body = {
        sucess: false,
        error: "An unknown error occurred",
      };
      console.log("Unknown error occurred:", err);
    }
    ctx.app.emit("error", err, ctx);
  }
};

export { errorMiddleware };
