import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@api/auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  if (req.method === 'POST') {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })

      const rodeo = await prisma.rodeo.create({
        data: {
          ...req.body,
          admin: { 
            connect: { id: user.id}
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