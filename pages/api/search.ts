import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../util/mysql';

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.query;

  if (text) {
    const [result] = await (pool as Pool).execute(
      `select name,org,logo,android,ios,pc,category from apps where match(org,name) against ('${text}' in natural language mode) Limit 100;`
    );
    res.json(result);
  } else {
    res.status(400).json('Bad Query');
  }
}
