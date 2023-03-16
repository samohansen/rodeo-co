import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { rodeoId } = req.query

  if (req.method === 'POST') {
    try {
      const { name, time, minAge, maxAge, fee, prize } = req.body;
      const event = await prisma.rodeoEvent.create({
        data: {
          name,
          time,
          minAge,
          maxAge,
          fee,
          prize,
          rodeo: {
            connect: { id: rodeoId }
          }
        }
      })
      res.status(200).json(event);
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
