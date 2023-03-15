import TabPanel from '@common/dataDisplay/TabPanel';
import { PrismaClient } from '@prisma/client';
import BasicTable from '@common/dataDisplay/BasicTable';
import EventDetails from '@features/EventView/EventDetails';
import type { nRodeoEvent } from '@common/types';

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
      }
    }
  });

  return {
    props: {
      event: JSON.parse(JSON.stringify(event))
    }
  }
}

const EventView: React.FC<Props> = ({event}) => {
  const participantData = event.entries.map(
    entry => ({
      name: `${entry.participant.firstName} ${entry.participant.lastName}`,
      horse: entry.horseName,
      time: entry.time
    })
  )

  return (
    <TabPanel
      tabNames={['Entries', 'Rankings', 'Event details']}
    >
      {
        !!event.entries.length ? (
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
      <div>
        <EventDetails event={event} />
      </div>
    </TabPanel>
  )
}

export default EventView;
