import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { rodeoId } = req.query

  // create new event, attached to rodeo
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
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  // update existing rodeo info
  else if (req.method === 'PATCH') {
    try {
      const rodeo = await prisma.rodeo.update({
        where: { id: rodeoId },
        data: req.body,
      });
      res.status(200).json(rodeo);
    } catch (err) {
      res.status(500).json({message: "Couldn't update the rodeo"})
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const rodeo = await prisma.rodeo.delete({
        where: {id: rodeoId}
      });
      res.status(200).json(rodeo);
    } catch (err) {
      res.status(500).json({message: 'failed to delete rodeo'})
    }
  }
  else {
    res.setHeader('Allow', ['POST', 'DELETE', 'PATCH' ]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};
