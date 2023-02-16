// reseed with `prisma db seed`

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'macy@test.com',
        type: 'participant',
        firstName: 'Macy',
        lastName: 'Hatter',
      },
      {
        email: 'cindy@test.com',
        type: 'participant',
        firstName: 'Cindy',
        lastName: 'Potter'
      },
      {
        email: 'riley@test.com',
        type: 'participant',
        firstName: 'Riley',
        lastName: 'Schmid'
      },
    ]
  })
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@test.com',
      type: 'admin',
      firstName: 'Admin',
      lastName: 'Guy',
      rodeos: {
        create: [
          {
            name: 'West Valley County',
            location: 'West Valley City, UT',
            date: new Date ('2023-05-13'),
            notes: 'sponsorships etc',
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
            name: 'Tough Enough to Wear Pink',
            location: 'Spanish Fork, UT',
            date: new Date ('2023-06-15'),
            notes: 'sponsorships etc',
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
          }
        ]
    },
    }
  })

  const rodeos = await prisma.rodeo.findMany({
    where: {adminId: admin.id},
    include: {
      events: true,
    }
  })

  const participants = await prisma.user.findMany({
    where: {type: 'participant'}
  })

  rodeos[0].events.forEach(async event => {
    await prisma.rodeoEvent.update({
      where: {id: event.id},
      data: {
        entries: {
          createMany: {
            data: [
              {
                participantId: participants[0].id,
                horseName: 'Bullet'
              },
              {
                participantId: participants[1].id,
                horseName: 'Midnight'
              },
              {
                participantId: participants[2].id,
                horseName: 'Boot'
              },
            ]
          }
        }
      }
    })
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })