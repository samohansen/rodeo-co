import type { ReactElement } from 'react';
import type { nRodeoEvent } from '@common/types';
import type { NextPageWithLayout } from '@common/types';
import { PrismaClient } from '@prisma/client';
import TabPanel from '@common/dataDisplay/TabPanel';
import BasicTable from '@common/dataDisplay/BasicTable';
import EventDetails from '@features/RodeoDashboard/EventView/EventDetails';
import LeftNavLayout from '@common/layouts/LeftNavLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import { buildEventTitleString } from "@common/utils";

type Props = {
  event: nRodeoEvent;
}

const prisma = new PrismaClient()
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
  const participantData = event.entries.map(
    entry => ({
      name: `${entry.participant.firstName} ${entry.participant.lastName}`,
      horse: entry.horseName,
      time: entry.time
    })
  )

  return (
    <RodeoDashboardLayout
      pageTitle={buildEventTitleString(event)}
      back={{
        path: `/rodeos/${encodeURIComponent(event.rodeoId)}`,
        text: event.rodeo.name,
      }}
    >
      <TabPanel
        tabNames={['Event details', `Entries (${participantData.length})`, 'Rankings']}
      >
        <EventDetails event={event} />
        {
          !!participantData.length ? (
            <BasicTable
              head={['Name', 'Horse', 'Time']}
              data={participantData}
            />
          ) : (
            "No participants have signed up for this event yet"
          )
        }
        <div>
          [event rankings]
        </div>
      </TabPanel>
    </RodeoDashboardLayout>
  )
}

EventView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default EventView;
