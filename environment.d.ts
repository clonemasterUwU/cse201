declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      MYSQL_HOST: string;
      MYSQL_USER: string;
      MYSQL_PASS: string;
      MYSQL_DATABASE: string;
      TABLE_USER: string;
    }
  }
}

export {};
