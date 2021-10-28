import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../util/mysql';

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  console.log(process.env.MYSQL_HOST);
  const { org, name } = req.query;
  if (!!org !== !!name) {
    if (org) {
      const [result] = await (pool as Pool).execute(
        `select name,org,logo,android,ios,pc,category from apps where match(org) against ('${org}' in natural language mode) Limit 100;`
      );
      res.json(result);
    } else {
      const [result] = await (pool as Pool).execute(
        `select name,org,logo,android,ios,pc,category from apps where match(name) against ('${name}' in natural language mode) Limit 100;`
      );
      res.json(result);
    }
  } else {
    res.status(400).json('Bad Query');
  }
}
