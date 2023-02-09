import TabPanel from '@common/display/TabPanel';
import RodeoDetails from './RodeoDetails';
import EventsList from './EventsList';
import { useState } from 'react';
import EventView from '../EventView/EventView';
import type { Rodeo } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function getServerSideProps () {

//   const rodeoEvents = await prisma.rodeoEvent.findMany({
//     where: {rodeoId: }
//   });

//   return {
//     props: {
//       rodeos: JSON.parse(JSON.stringify(rodeos))
//       // rodeos: rodeos.map(rodeo => ({
//       //   ...rodeo,
//       //   date: formatDate(rodeo.date)
//       // })),
//     }
//   }
// }


const RodeoView = ({rodeo}) => {


  const {date, name, location, events} = rodeo;
  const [viewEvent, setViewEvent] = useState(null)

  return (<>
    <h1>{rodeo.name}</h1>
    {!viewEvent ? (
      <TabPanel
        tabNames={["Events List", "Information"]}
      >
        <EventsList events={events} onEventClick={setViewEvent}/>
        <RodeoDetails {...rodeo} />
      </TabPanel>
    ) : (
      <EventView
        event={viewEvent}
      />
    )}
  </>
  )
}

export default RodeoView;