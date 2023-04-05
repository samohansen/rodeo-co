import { PrismaClient } from '@prisma/client';
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = await getToken({ req })

  // currently only called to seed new admin data. probably a mistake to do that here
  if (req.method === 'GET') {
    try {
        const admin = await prisma.user.update({
          where: {id: token.sub},
          data: {
            rodeos: {
              create: [
                {
                  name: 'Sample 1',
                  location: 'West Valley City, UT',
                  date: new Date ('2023-03-13'),
                  notes: 'sponsorships etc',
                  imgSrc: '/1.png',
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
                }, 
                {
                  name: 'Sample 2',
                  location: 'West Valley City, UT',
                  date: new Date ('2023-04-13'),
                  notes: 'sponsorships etc',
                  imgSrc: '/2.png',
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
                }, 
                {
                  name: 'Sample 3',
                  location: 'Spanish Fork, UT',
                  date: new Date ('2023-06-15'),
                  notes: 'sponsorships etc',
                  imgSrc: '/3.png',
                  events: {
                    createMany: {
                      data: [
                        {
                          name: 'Barrel Race',
                          time: new Date (2019, 0o4, 13, 17),
                          minAge: 18,
                          fee: 20,
                        },{
                          name: 'Pole Bending',
                          time: new Date (2019, 0o4, 13, 17, 30),
                          minAge: 18,
                          fee: 20,
                        },{
                          name: 'Goat Tying',
                          time: new Date (2019, 0o4, 13, 18),
                          minAge: 18,
                          fee: 20,
                        }, {
                          name: 'Break-away Roping',
                          time: new Date (2019, 0o4, 13, 18, 30),
                          minAge: 18,
                          fee: 20,
                        },{
                          name: 'Saddle Bronc Riding',
                          time: new Date (2019, 0o4, 13, 19),
                          minAge: 18,
                          fee: 20,
                        },{
                          name: 'Team Roping',
                          time: new Date (2019, 0o4, 13, 19, 30),
                          minAge: 18,
                          fee: 20,
                        }
                      ]
                    } 
                  }
                },
              ]
            }
          }
        })

        const rodeos = await prisma.rodeo.findMany({
          where: {adminId: admin.id},
          include: {
            events: true,
          }
        })

        const participants = [
          'clg40gs19000094i47806ihbw',
          'clg40gs1b000294i4ommszw2u',
          'clg40gs1c000494i4fbhx6u2h',
          'clg40gs1c000694i4zyw8nx92',
        ]

        rodeos.forEach(rodeo => {
          rodeo.events.forEach(async event => {
            await prisma.rodeoEvent.update({
              where: {id: event.id},
              data: {
                entries: {
                  createMany: {
                    data: [
                      {
                        participantId: participants[0],
                        horseName: 'Bullet'
                      },
                      {
                        participantId: participants[1],
                        horseName: 'Midnight'
                      },
                      {
                        participantId: participants[2],
                        horseName: 'Boot'
                      },
                    ]
                  }
                }
              }
            })
          });
        })


      const user = await prisma.user.findUnique({
        where: {id: token.sub},
      })
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({message: "Couldn't find the user"})
    }
  }
  else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
