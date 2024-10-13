import { Config } from "../types/config";

const config: Config = {
  port: Number(process.env.PORT || 5252),
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017",
  dbName: process.env.MONGO_DB_NAME || "vaultody",
  maxPoolSize: Number(process.env.MAX_POOL_SIZE || 100),
};

export { config };
