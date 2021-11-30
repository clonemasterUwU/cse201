import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader } from 'mysql2';

import pool from '../../../util/mysql';
import withAuth from '../../../util/check_jwt';
async function approve(req: NextApiRequest, res: NextApiResponse) {
  const { app, approve } = req.body;
  if (!app || !approve) {
    res.status(400).json({ message: 'Missing required field' });
  }

  if (approve) {
    const result = await (pool as Pool).execute(
      `BEGIN TRANSACTION;
    INSERT INTO ${process.env.TABLE_APPS} 
  (uuid,name,org,logo,android,ios,pc,category) (SELECT (uuid,name,org,logo,android,ios,pc,category) FROM ${process.env.TABLE_PENDING_APP} WHERE name=?);
    DELETE FROM ${process.env.TABLE_PENDING_APP} where name=?;
    COMMIT;
  `,
      [app, app]
    );
  } else {
    const result = await (pool as Pool).execute(`DELETE FROM ${process.env.TABLE_PENDING_APP} where name=?;`, [app]);
  }
  res.status(200).json({ message: 'ok' });
}
// export default approve;
export default withAuth(approve, 'ADMIN');
