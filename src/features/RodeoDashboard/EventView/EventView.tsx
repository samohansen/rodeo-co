import BasicTable from "@common/display/BasicTable";
import type { RodeoEvent } from '@prisma/client'

type Props = {
  event: RodeoEvent;
}

const EventView: React.FC<Props> = ({event}) => {
  const participantData = event.entries.map(
    entry => ({
      name: entry.participant.name,
      horse: entry.horse,
      time: entry.time
    })
  )
  return (
    <BasicTable
      head={['Name', 'Horse', 'Time']}
      data={participantData}
    />
  )
}

export default EventView;