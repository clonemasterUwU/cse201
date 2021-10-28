import { compare } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../util/mysql';
import cookie from 'cookie';
import { Pool } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { sign } from 'jsonwebtoken';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Improper method' });
    return;
  }
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Missing username or password' });
    return;
  }

  const [rows] = await (pool as Pool).execute(
    `select BIN_TO_UUID(uuid)id,email,password from ${process.env.TABLE_USER} where email = ?`,
    [req.body.username]
  );
  if ((rows as RowDataPacket[]).length > 1) {
    res.status(500).json({ message: 'Internal Error' });
    return;
  }
  const user_record = (rows as RowDataPacket[])[0];
  const result = await compare(req.body.password, user_record.password);
  if (result) {
    const claims = {
      sub: user_record.uuid,
      email: user_record.email,
      role: 'STANDARD',
    };
    const jwt = sign(claims, process.env.SECRET, { expiresIn: '1h' });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );
    res.status(200).json({ message: 'Ok' });
  } else {
    res.status(401).json({ message: 'Wrong email or password' });
  }
}
