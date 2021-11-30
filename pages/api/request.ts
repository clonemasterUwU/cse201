import { Pool } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../util/mysql';
import withPermission from '../../util/check_jwt';
const request = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  res.status(200).json('');
};
export default withPermission(request, 'STANDARD');
