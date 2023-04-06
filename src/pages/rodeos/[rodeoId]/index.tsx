import type { ReactElement } from 'react';
import type { nRodeo, NextPageWithLayout } from '@common/types';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoView/RodeoDetails';
import EventsList from '@features/RodeoDashboard/RodeoView/EventsList';
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormInterface from '@features/RodeoDashboard/RodeoForms/CreateEventFormInterface';
import CreateRodeoFormInterface from '@features/RodeoDashboard/RodeoForms/CreateRodeoFormInterface';
import PageLayout from '@common/layouts/PageLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import DeleteRodeoModal from '@features/RodeoDashboard/RodeoForms/DeleteRodeoModal';
import { compareObjNames } from '@common/utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from '@features/RodeoDashboard/RodeoView/RodeoView.module.css'

type Props = {
  rodeo: nRodeo;
  prevHref: string;
}

const prisma = new PrismaClient()
export async function getServerSideProps(context) {
  const {rodeoId} = context.query;

  const rodeo = await prisma.rodeo.findUnique({
    where: {id: rodeoId},
    include: {
      events: {
        orderBy: {name: 'asc'},
        include: {
          entries: {
            include: {participant: true}
          },
        }
      }
    }
  });

  return {
    props: {
      rodeo: JSON.parse(JSON.stringify(rodeo)),
      prevHref: context.req.headers.referer || null // todo: this isn't a reliable way to tell what's up
    }
  }
}

const RodeoView: NextPageWithLayout<Props> = ({rodeo, prevHref}) => {
  const router = useRouter();
  const [editingEvents, setEditingEvents] = useState(false);
  const events = JSON.parse(JSON.stringify(rodeo.events)); // todo: don't need to stringify and parse?
  // todo: handle null
  const {data: session} = useSession();
  const isAdmin = session?.user?.type === "admin";

  // necessary because Postgres collation is deterministic (case-sensitive) and Prisma doesn't support ignoring that in the query
  events.sort(compareObjNames); 

  return (
    <RodeoDashboardLayout
      pageTitle={rodeo.name}
      back={{
        linkText: 'All rodeos',
        // saves time - back() is quicker, so do that if the user actually came from /rodeos
        ...(prevHref?.endsWith('/rodeos') ? { 
          onClick: () => router.back()
        } : {
          path: '/rodeos',
        })
      }}
      rightHeaderComponent={''}
    >
      <TabPanel tabNames={['Events List', 'Information']} disabled={editingEvents}>
        <Box className={styles.panel} >
          <Box className={styles.panelContent}>
            <EventsList events={events} editingEvents={editingEvents}/>
          </Box>
          {isAdmin && (
            <Box className={styles.panelActions} >
              <OpenModalButton buttonText='Add new event' buttonProps={{disabled: editingEvents}} >
                <CreateEventFormInterface rodeoId={rodeo.id}/>
              </OpenModalButton>
              <> {/* this is only wrapped in a fragment because Box was being pissy about being given JS in the ternary */}
                {!!events.length ? (
                  <Button sx={{width: '111px'}}
                    onClick={() => setEditingEvents(!editingEvents)} 
                    {...(editingEvents && {variant: 'contained'})} 
                  >
                    {editingEvents ? 'End edits' : 'Bulk edit'}
                  </Button>
                ) : (
                  // ensures "add event" is re-enabled after last event is deleted
                  editingEvents && setEditingEvents(!editingEvents)
                )} 
              </>
            </Box>
          )}            
        </Box>
        <Box className={styles.panel} >
          <Box className={styles.panelContent}>
            <RodeoDetails {...rodeo} />
          </Box>
          {isAdmin && (
            <Box className={styles.panelActions} >
              <OpenModalButton buttonText='Edit rodeo'>
                <CreateRodeoFormInterface editing={true} rodeo={rodeo} />
              </OpenModalButton>
              <OpenModalButton buttonText='Delete rodeo' buttonProps={{color: 'error'}}>
                <DeleteRodeoModal rodeo={rodeo}/>
              </OpenModalButton>
            </Box>
          )}
        </Box>
      </TabPanel>
    </RodeoDashboardLayout>
  )
}

RodeoView.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default RodeoView;
