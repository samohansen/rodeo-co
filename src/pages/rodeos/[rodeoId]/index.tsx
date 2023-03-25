import type { ReactElement } from 'react';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client'
import type { nRodeo } from '@common/types';
import type { NextPageWithLayout } from '@common/types';
import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoView/RodeoDetails';
import EventsList from '@features/RodeoDashboard/RodeoView/EventsList';
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormInterface from '@features/RodeoDashboard/RodeoForms/CreateEventFormInterface';
import CreateRodeoFormInterface from '@features/RodeoDashboard/RodeoForms/CreateRodeoFormInterface';
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
  const [editingEvents, setEditingEvents] = useState(false);
  const events = JSON.parse(JSON.stringify(rodeo.events)); // todo: don't need to stringify and parse?

  return (
    <RodeoDashboardLayout
      pageTitle={rodeo.name}
      back={{
        path: '/rodeos',
        text: 'All rodeos',
      }}
      rightHeaderComponent={''
      }
    >
      <TabPanel
        tabNames={['Events List', 'Information']}
      >
        <>
          <EventsList events={events} editingEvents={editingEvents}/>
          <OpenModalButton 
            buttonText='Add new event'
            buttonProps={{disabled: editingEvents}}
          >
            <CreateEventFormInterface rodeoId={rodeo.id}/>
          </OpenModalButton>
          {!!events.length ? (
            <Button onClick={() => setEditingEvents(!editingEvents)} >
              {editingEvents ? 'Done editing' : 'Edit events'}
            </Button>
          ) : null}
        </>
        <>
          <RodeoDetails {...rodeo} />
          <OpenModalButton 
            buttonText='Edit rodeo'
          >
            <CreateRodeoFormInterface
              editing={true}
              rodeo={rodeo}
            />
          </OpenModalButton>
        </>
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
