import { hash } from 'bcrypt';
import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../util/mysql';
import { ResultSetHeader } from 'mysql2';
export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Improper method' });
    return;
  }

  if (!req.body.username || !req.body.password) {
    //just check not falsy value, should validate later
    res.status(401).json({ message: 'Missing username or password' });
    return;
  }
  const hashed_password = await hash(req.body.password, 10);
  const [result] = await (pool as Pool).execute(
    `INSERT INTO ${process.env.TABLE_USER}(uuid,email,password) SELECT UUID_TO_BIN(UUID()),?,? FROM dual 
    WHERE NOT EXISTS (SELECT * FROM ${process.env.TABLE_USER} WHERE email=?);`,
    [req.body.username, hashed_password, req.body.username]
  );
  if ((result as ResultSetHeader).affectedRows === 0) {
    res.status(401).json({ message: 'Duplicated Email' });
  } else {
    res.status(200).json({ message: 'ok' });
  }
}
