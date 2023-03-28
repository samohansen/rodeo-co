import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const rodeo = await prisma.rodeo.create({
        data: {
          ...req.body,
          admin: { 
            connect: { email: 'admin@test.com'}
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