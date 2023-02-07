import BasicTable from "@common/display/BasicTable";
import type { RodeoEvent } from "@common/Types";

type Props = {
  event: RodeoEvent;
}

const EventView: React.FC<Props> = ({event}) => {
  return (
    <BasicTable
      head={['ID', 'Name', 'Horse', 'Time']}
      data={event.participantEntries}
    />
  )
}

export default EventView;