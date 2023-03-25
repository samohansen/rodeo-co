import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import type { RodeoEvent } from '@prisma/client';
import EventItem from './EventItem'

type Props = {
  events: RodeoEvent[];
  editingEvents: boolean;
}

const EventsList: React.FC<Props> = ({events, editingEvents}) => {
  const router = useRouter();

  return (
    <Stack>
      {events.map(event => (
        <li key={event.id} style={{listStyleType: 'none'}}>
          <EventItem 
            event={event}
            onEventClick={() => router.push(`/rodeos/${encodeURIComponent(event.rodeoId)}/${encodeURIComponent(event.id)}`)}
            editingEvents={editingEvents}
          />
        </li>
      ))}
    </Stack>
  )
}

export default EventsList;
