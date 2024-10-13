import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { initRoutes } from "./routes";
import { config } from "./config";
import { errorMiddleware } from "./middlewares/errors";
import { initDb } from "./models/dbConnection";
import { requestLogger } from "./middlewares/logging";

const app: Koa = new Koa();

app.use(requestLogger)

app.use(bodyParser());

app.use(errorMiddleware);

initRoutes(app);

const startServer = async () => {
  await initDb();
  app.listen(config.port, () =>
    console.log(`App started listening to: ${config.port}.`)
  );
};

startServer().catch(console.log);
