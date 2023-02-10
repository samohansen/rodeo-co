import TabPanel from '@common/dataDisplay/TabPanel';
import { PrismaClient } from '@prisma/client'
import BasicTable from "@common/dataDisplay/BasicTable";


const EventView = ({event}) => {
  const participantData = event.entries.map(
    entry => ({
      name: entry.participant.name,
      horse: entry.horse,
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
          "no participants have signed up for this event yet"
        )
      }
      <div>
        [event rankings]
      </div>
      <div>
        [event details]
      </div>
    </TabPanel>
  )
}
export default EventView;

const prisma = new PrismaClient()
export async function getServerSideProps(context) {
  const {eventId} = context.query;

  const event = await prisma.rodeoEvent.findUnique({
    where: {id: eventId},
    include: {
      entries: true
      // entries: {
      //   include: {participant: true}
      // }
    }
  });

  return {
    props: {
      event: JSON.parse(JSON.stringify(event))
    }
  }
}
