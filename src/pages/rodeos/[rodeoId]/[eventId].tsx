import type { ReactElement } from 'react';
import type { nRodeoEvent, NextPageWithLayout } from '@common/types';
import prisma from 'src/prisma';
import TabPanel from '@common/dataDisplay/TabPanel';
import BasicTable from '@common/dataDisplay/BasicTable';
import EventDetails from '@features/RodeoDashboard/EventView/EventDetails';
import PageLayout from '@common/layouts/PageLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import { buildEventTitleString } from "@common/utils";
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateEventFormInterface from '@features/RodeoDashboard/RodeoForms/CreateEventFormInterface';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import styles from '@features/RodeoDashboard/RodeoView/RodeoView.module.css'
import EventEntryInterface from '@features/RodeoDashboard/RodeoForms/EventEntryInterface';

type Props = {
  event: nRodeoEvent;
}

export async function getServerSideProps(context) {
  const {eventId} = context.query;

  const event = await prisma.rodeoEvent.findUnique({
    where: {id: eventId},
    include: {
      entries: {
        include: {participant: true}
      },
      rodeo: {
        select: {name: true}
      }
    }
  });

  return {
    props: {
      event: JSON.parse(JSON.stringify(event)),
    }
  }
}

const EventView: NextPageWithLayout<Props> = ({event}) => {
  const {data: session} = useSession();
  const isAdmin = session?.user?.type === "admin";
  
  const participantData = event.entries.map(
    entry => ({
      name: entry.participant.name || entry.participant.email,
      horse: entry.horseName,
      time: entry.time
    })
  )

  return (
    <RodeoDashboardLayout
      pageTitle={buildEventTitleString(event)}
      back={{
        path: `/rodeos/${encodeURIComponent(event.rodeoId)}`,
        linkText: event.rodeo.name,
      }}
      rightHeaderComponent={isAdmin ? (
        <OpenModalButton buttonText='Edit details' buttonProps={{variant: 'contained'}}>
          <CreateEventFormInterface editing={true} event={event} />
        </OpenModalButton>
      ) : (
        <OpenModalButton buttonText='Enter event' buttonProps={{variant: 'contained'}}>
          <EventEntryInterface event={event} participantId={session?.user.id} />
        </OpenModalButton>
      )}
    >
      <TabPanel tabNames={['Event details', `Entries (${participantData.length})`, 'Rankings']} >
        <Box className={styles.panel} >
          <Box className={styles.panelContent}>
            <EventDetails event={event} />
          </Box>
          {/* {isAdmin && (
            <Box className={styles.panelActions} >
              <OpenModalButton buttonText='Edit event'>
                <CreateEventFormInterface editing={true} event={event} />
              </OpenModalButton>
            </Box>
          )}             */}
        </Box>
        {!!participantData.length ? (
          <BasicTable
            head={['Name', 'Horse', 'Run time']}
            data={participantData}
          />
        ) : (
          <Typography variant='subtitle1' color="gray">
            No one has entered this event yet
          </Typography>
        )}
        <div>
          <Typography variant='overline' color="gray">
            Coming soon!
          </Typography>
        </div>
      </TabPanel>
    </RodeoDashboardLayout>
  )
}

EventView.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default EventView;
