import prisma from 'src/prisma';

export default async function handler(req, res) {
  const { rodeoId } = req.query;
  console.log(rodeoId)

  if (req.method === 'GET') {
    try {
      // const event = await prisma.rodeoEvent.createMany({
      //   data: {
      //     ...req.body,
      //     rodeo: {
      //       connect: { id: rodeoId }
      //     }
      //   }
      // })

      const rodeo = await prisma.rodeo.update({
        where: {id: rodeoId},
        data: {
          events: {
            createMany: {
              data: [
                {
                  name: 'Barrel Race',
                  time: new Date (2019, 0o4, 13, 17),
                  minAge: 6,
                  maxAge: 12,
                  fee: 20,
                },{
                  name: 'Barrel Race',
                  time: new Date (2019, 0o4, 13, 17, 30),
                  minAge: 13,
                  maxAge: 17,
                  fee: 20,
                },{
                  name: 'Barrel Race',
                  time: new Date (2019, 0o4, 13, 18),
                  minAge: 18,
                  fee: 20,
                }, {
                  name: 'Pole Bending',
                  time: new Date (2019, 0o4, 13, 18, 30),
                  minAge: 6,
                  maxAge: 12,
                  fee: 20,
                },{
                  name: 'Pole Bending',
                  time: new Date (2019, 0o4, 13, 19),
                  minAge: 13,
                  maxAge: 17,
                  fee: 20,
                },{
                  name: 'Pole Bending',
                  time: new Date (2019, 0o4, 13, 19, 30),
                  minAge: 18,
                  fee: 20,
                }
              ]
            }
          }
        }
      })
      res.status(200).json(rodeo);
      return res.data
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};