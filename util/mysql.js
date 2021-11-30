import mysql from 'mysql2';
import dotenv from 'dotenv';

const Singleton = Symbol.for('MYSQL');
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDB = globalSymbols.indexOf(Singleton) > -1;
if (!hasDB) {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  const promisePool = pool.promise();
  global[Singleton] = promisePool;
}
const singletonPool = {};
Object.defineProperty(singletonPool, 'instance', {
  get() {
    return global[Singleton];
  },
});

Object.freeze(singletonPool);
export default singletonPool.instance;
