interface Config {
  port: number;
  mongoUri: string;
  dbName: string;
  maxPoolSize: number;
  minPoolSize?: number;
}

export { Config };
