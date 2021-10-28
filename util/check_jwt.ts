import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const authenticated = (fn: NextApiHandler, role: string) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth, process.env.SECRET, async function (err, decoded) {
    if (!err && decoded && decoded.role === role) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Not authenticated. Maybe' });
  });
};

export default authenticated;
