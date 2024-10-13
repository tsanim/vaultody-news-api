import { Db, MongoClient } from "mongodb";
import { config } from "../config";
import { COLLECTIONS } from "../constants";

const { mongoUri, maxPoolSize, dbName } = config;

let db: null | Db = null;

const connectToDb = async () => {
  const client = new MongoClient(mongoUri, { maxPoolSize });
  await client.connect();
  console.log("Connected to database");
  db = client.db(dbName);
};

const createIndexes = async () => {
  if (!db) {
    throw new Error("Database is not connected");
  }

  try {
    // news indexes
    await getNewsCursor().createIndex({ title: 1 });
    await getNewsCursor().createIndex({ date: 1 });
    await getNewsCursor().createIndex({ title: "text" });
    // compound index
    await getNewsCursor().createIndex({ title: 1, date: 1 });
    console.log("Indexes created");
  } catch (error) {
    // Do not break anything if error with indexes
    console.error("Error creating indexes:", error);
  }
};

const getNewsCursor = () => {
  if (!db) {
    throw new Error("Database is not connected");
  }

  return db.collection(COLLECTIONS.NEWS);
};

const initDb = async () => {
  await connectToDb();
  await createIndexes();
};

export { getNewsCursor, createIndexes, connectToDb, initDb };
