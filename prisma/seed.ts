// reseed with `prisma db seed`

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  // const user = await prisma.user.upsert({
  //   // where: { email: ''}

  // })
  
  // user and admin done in one transaction to get the userId with which to create the Admin
  await prisma.$transaction(async (prisma) => {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com'},
      update: {},
      create: {
        email: 'admin@test.com',
        type: 'admin',
        rodeos: {
          create: [
            {
              name: 'West Valley County',
              location: 'West Valley City, UT',
              date: new Date ('2023-05-13'),
              notes: 'sponsorships etc',
              events: {
                create: [
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
            }, {
              name: 'Tough Enough to Wear Pink',
              location: 'Spanish Fork, UT',
              date: new Date ('2023-06-15'),
              notes: 'sponsorships etc',
              events: {
                create: [
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
          ]
        }
      },
    });
    console.log(admin)
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