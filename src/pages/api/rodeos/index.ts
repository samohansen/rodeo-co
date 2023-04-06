import prisma from 'src/prisma';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const token = await getToken({req})

  if (token.type !== 'admin') {
    return res.status(401).json({ message: 'Must be authorized as rodeo producer' });
  }

  if (req.method === 'POST') {
    try {
      const rodeo = await prisma.rodeo.create({
        data: {
          ...req.body,
          admin: { 
            connect: { id: token.sub}
          }
        }
      })
      res.status(200).json(rodeo);
      return res.data
    } catch (e) {
      res.status(500).json(e);
    }
  }
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};