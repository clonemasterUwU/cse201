import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader } from 'mysql2';

import pool from '../../../util/mysql';
import withAuth from '../../../util/check_jwt';
async function add_request(req: NextApiRequest, res: NextApiResponse) {
  const { app, org, category, logo, android, ios, pc } = req.body;
  if (!app || !org || !category || !logo) {
    res.status(400).json('Missing required field');
  }
  const [result] = await (pool as Pool).execute(
    `INSERT INTO ${process.env.TABLE_PENDING_APP} 
  (uuid,name,org,logo,android,ios,pc,category,time) SELECT UUID_TO_BIN(UUID()),?,?,?,?,?,?,?,NOW() FROM dual 
  WHERE NOT EXISTS(SELECT * FROM ${process.env.TABLE_APPS} WHERE name=?) AND NOT EXISTS(SELECT * FROM ${process.env.TABLE_PENDING_APP} WHERE name=?);`,
    [app, org, logo, android ? android : 'NULL', ios ? ios : 'NULL', pc ? pc : 'NULL', category, app, app]
  );
  if ((result as ResultSetHeader).affectedRows === 0) {
    res.status(400).json({ message: 'Duplicated app name in pending or already added' });
  } else {
    res.json({ message: 'ok' });
  }
}
export default withAuth(add_request, 'STANDARD');
