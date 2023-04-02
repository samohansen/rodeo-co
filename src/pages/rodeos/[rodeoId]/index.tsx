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
import DeleteRodeoModal from '@features/RodeoDashboard/RodeoForms/DeleteRodeoModal';
import { compareObjNames } from '@common/utils';
import { useRouter } from 'next/router';

type Props = {
  rodeo: nRodeo;
  prevHref: string;
}

const prisma = new PrismaClient()
export async function getServerSideProps(context) {
  const {rodeoId} = context.query;

  const rodeo = await prisma.rodeo.findUnique({
    where: {id: rodeoId},
    include: {events: {orderBy: {name: 'asc'}}}
  });

  return {
    props: {
      rodeo: JSON.parse(JSON.stringify(rodeo)),
      prevHref: context.req.headers.referer // todo: this isn't a reliable way to tell what's up
    }
  }
}

const RodeoView: NextPageWithLayout<Props> = ({rodeo, prevHref}) => {
  const router = useRouter();
  const [editingEvents, setEditingEvents] = useState(false);
  const events = JSON.parse(JSON.stringify(rodeo.events)); // todo: don't need to stringify and parse?
  
  // necessary because Postgres collation is deterministic (case-sensitive) and Prisma doesn't support ignoring that in the query
  events.sort(compareObjNames); 

  return (
    <RodeoDashboardLayout
      pageTitle={rodeo.name}
      back={{
        linkText: 'All rodeos',
        // saves time - back() is quicker, so do that if the user actually came from /rodeos
        ...(prevHref.endsWith('/rodeos') ? { 
          onClick: () => router.back()
        } : {
          path: '/rodeos',
        })
      }}
      rightHeaderComponent={''}
    >
      <TabPanel tabNames={['Events List', 'Information']} disabled={editingEvents}>
        <>
          <EventsList events={events} editingEvents={editingEvents}/>
          <OpenModalButton buttonText='Add new event' buttonProps={{disabled: editingEvents}} >
            <CreateEventFormInterface rodeoId={rodeo.id}/>
          </OpenModalButton>
          {!!events.length ? (
            <Button 
              onClick={() => setEditingEvents(!editingEvents)} 
              {...(editingEvents && {variant: 'contained'})} 
              sx={{width: '111px'}}
            >
              {editingEvents ? 'End edits' : 'Bulk edit'}
            </Button>
          ) : editingEvents && setEditingEvents(!editingEvents) } {/* ensures "add event" is re-enabled after last event is deleted */}
        </>
        <>
          <RodeoDetails {...rodeo} />
          <OpenModalButton buttonText='Edit rodeo'>
            <CreateRodeoFormInterface editing={true} rodeo={rodeo} />
          </OpenModalButton>
          <OpenModalButton buttonText='Delete rodeo' buttonProps={{color: 'error'}}>
            <DeleteRodeoModal rodeo={rodeo}/>
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
