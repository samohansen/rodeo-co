import prisma from 'src/prisma';

export default async function handler(req, res) {
  const { eventId } = req.query

  // update existing event info
  if (req.method === 'PATCH') {
    try {
      const event = await prisma.rodeoEvent.update({
        where: { id: eventId },
        data: req.body,
      });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({message: "Couldn't update the event"})
    }
  }
  // delete existing event
  else if (req.method === 'DELETE') {
    try {
      const event = await prisma.rodeoEvent.delete({
        where: {id: eventId}
      });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({message: 'something went wrong'});
    }
  }
  else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};
