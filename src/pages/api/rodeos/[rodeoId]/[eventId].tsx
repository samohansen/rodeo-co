import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { eventId } = req.query

  if (req.method === 'DELETE') {
    try {
      const event = await prisma.rodeoEvent.delete({
        where: {id: eventId}
      });
      res.status(200).json(event);
    } catch (e) {
      res.status(500).json({message: 'something went wrong'});
    }
  }
  else {
    res.setHeader('Allow', ['DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};
