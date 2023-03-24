import type { ReactElement } from 'react';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client'
import type { nRodeo } from '@common/types';
import type { NextPageWithLayout } from '@common/types';
import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoView/RodeoDetails';
import EventsList from '@features/RodeoDashboard/RodeoView/EventsList';
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormModal from '@features/RodeoDashboard/RodeoView/CreateEventFormModal'
import LeftNavLayout from '@common/layouts/LeftNavLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import Button from '@mui/material/Button';

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

const RodeoView: NextPageWithLayout<Props> = ({rodeo}) => {
  const [events, setEvents] = useState(JSON.parse(JSON.stringify(rodeo.events)));
  const [editingEvents, setEditingEvents] = useState(false);

  return (
    <RodeoDashboardLayout
      pageTitle={rodeo.name}
      back={{
        path: '/rodeos',
        text: 'All rodeos',
      }}
    >
      <TabPanel
        tabNames={['Events List', 'Information']}
      >
        <>
          <EventsList events={events} setEvents={setEvents} editingEvents={editingEvents}/>
          <OpenModalButton 
            buttonText='Add new event'
          >
            <CreateEventFormModal
              parentRodeo={rodeo.id}
              events={events}
              setEvents={setEvents}
            />
          </OpenModalButton>
          <Button 
            onClick={() => setEditingEvents(!editingEvents)}
          >
            {editingEvents ? 'Done editing' : 'Edit events'}
          </Button>
        </>
        <RodeoDetails {...rodeo} />
      </TabPanel>
    </RodeoDashboardLayout>
  )
}

RodeoView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default RodeoView;
