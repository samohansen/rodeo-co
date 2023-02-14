import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoDetails';
import EventsList from '@features/RodeoDashboard/EventsList';
import { PrismaClient } from '@prisma/client'
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormModal from '@features/RodeoDashboard/CreateEventFormModal'
import { useState } from 'react';

const RodeoView = ({initialRodeo, initialEvents}) => {
  const [rodeo, setRodeo] = useState(initialRodeo)
  const [events, setEvents] = useState(initialEvents);

  return (<>
    <h1>{rodeo.name}</h1>
    <TabPanel
      tabNames={["Events List", "Information"]}
    >
      <>
        <EventsList {...rodeo}/>
        <OpenModalButton buttonText="Add new event">
          <CreateEventFormModal
            events={events}
            setEvents={setEvents}
          />
        </OpenModalButton>
      </>
      <RodeoDetails {...rodeo} />
    </TabPanel>
  </>
  )
}
export default RodeoView;

const prisma = new PrismaClient()
export async function getServerSideProps(context) {
  const {rodeoId} = context.query;

  const rodeo = await prisma.rodeo.findUnique({
    where: {id: rodeoId},
    include: {events: true}
  });

  return {
    props: {
      initialRodeo: JSON.parse(JSON.stringify(rodeo)),
      initialEvents: JSON.parse(JSON.stringify(rodeo.events))
    }
  }
}
