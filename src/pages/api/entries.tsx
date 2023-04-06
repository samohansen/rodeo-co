import prisma from 'src/prisma';

export default async function handler(req, res) {
  const reqData = req.body;

  if (req.method === 'POST') {
    try {
      const entry = await prisma.eventEntry.create({
        data: {
          event: {connect: {id: reqData.eventId }},
          participant: {connect: {id: reqData.participantId }},
          horseName: reqData.horseName
        }
      })
      res.status(200).json(entry);
    } catch (err) {
      res.status(500).json({message: "Couldn't create the event entry"})
    }
  }
};
