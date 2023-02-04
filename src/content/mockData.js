export const PLACEHOLDER_RODEOS = [
  {
    rodeoId: 1,
    rodeoDetails: {
      name: 'West Valley County',
      location: 'West Valley City, Utah',
      date: 'May 13, 2023',
      notes: 'sponsorships etc'
    },
    rodeoEvents: [
      {
        eventId: 1,
        name: 'Barrel Race',
        ageLimits: [6, 12],
        minAge: 6,
        maxAge: 12,
        participantEntries:
        [
          {
            participantId: 1,
            name: 'Macy Hatter',
            horse: 'Bullet',
            time: 18.91,
          },
          {
            participantId: 2,
            name: 'Cindy Potter',
            horse: 'Midnight',
            time: 20.21,
          },
        ],
      },
      {
        eventId: 2,
        name: 'Barrel Race',
        ageLimits: [13, 17],
        minAge: 13,
        maxAge: 17,
        participantEntries:
        [
          {
            participantId: 1,
            name: 'Teen Hatter',
            horse: 'Bullet',
            time: 18.91,
          },
          {
            participantId: 2,
            name: 'Teen Potter',
            horse: 'Midnight',
            time: 20.21,
          }
        ]
      },
      {
        eventId: 3,
        name: 'Barrel Race',
        ageLimits: [18],
        minAge: 18,
        participantEntries:
        [
          {
            participantId: 1,
            name: 'Adult Hatter',
            horse: 'Bullet',
            time: 18.91,
          },
          {
            participantId: 2,
            name: 'Adult Potter',
            horse: 'Midnight',
            time: 20.21,
          }
        ]
      }
    ]
  },
  {
    rodeoId: 2,
    rodeoDetails: {
      name: 'Tough Enough to Wear Pink',
      location: 'Spanish Fork, Utah',
      date: 'June 15, 2023',
      notes: 'sponsorships etc'
    },
    rodeoEvents: [
      {
        eventId: 1,
        name: 'Barrel Race',
        ageLimits: [6, 12],
        minAge: 6,
        maxAge: 12,
        participantEntries:
        [
          {
            participantId: 1,
            name: 'Macy Hatter',
            horse: 'Bullet',
            time: 18.91,
          },
          {
            participantId: 2,
            name: 'Cindy Potter',
            horse: 'Midnight',
            time: 20.21,
          }
        ]
      }
    ]
  }
]