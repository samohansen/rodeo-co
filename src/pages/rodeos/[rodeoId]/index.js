import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDetails from '@features/RodeoDashboard/RodeoDetails';
import EventsList from '@features/RodeoDashboard/EventsList';
import { PrismaClient } from '@prisma/client'

const RodeoView = ({rodeo}) => {
  return (<>
    <h1>{rodeo.name}</h1>
    <TabPanel
      tabNames={["Events List", "Information"]}
    >
      <EventsList {...rodeo}/>
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
      rodeo: JSON.parse(JSON.stringify(rodeo))
    }
  }
}
