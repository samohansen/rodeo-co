import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoDetails';
import EventsList from '@features/RodeoDashboard/EventsList';
import { PrismaClient } from '@prisma/client'
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormModal from '@features/RodeoDashboard/CreateEventFormModal'
import { useState } from 'react';
import type { nRodeo } from '@common/types';

type Props = {
  rodeo: nRodeo;
}

const prisma = new PrismaClient()
export async function getServerSideProps(context) {
  const {rodeoId} = context.query;

  const rodeo = await prisma.rodeo.findUnique({
    where: {id: rodeoId},
    include: {events: true}
  });

  return {
    props: {
      rodeo: JSON.parse(JSON.stringify(rodeo)),
    }
  }
}

const RodeoView: React.FC<Props> = ({rodeo}) => {
  const [events, setEvents] = useState(JSON.parse(JSON.stringify(rodeo.events)));

  return (<>
    <h1>{rodeo.name}</h1>
    <TabPanel
      tabNames={['Events List', 'Information']}
    >
      <>
        <EventsList id={rodeo.id} events={events}/>
        <OpenModalButton 
          buttonText='Add new event'
        >
          <CreateEventFormModal
            parentRodeo={rodeo.id}
            events={events}
            setEvents={setEvents}
          />
        </OpenModalButton>
      </>
      <RodeoDetails {...rodeo} />
    </TabPanel>
  </>)
}

export default RodeoView;
