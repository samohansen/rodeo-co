import styles from './EventsList.module.css'
import EventItem from './EventItem'
import { useRouter } from 'next/router';
import type { RodeoEvent, Rodeo } from '@prisma/client';

type Props = {
  events: RodeoEvent[];
  setEvents: any;
  editingEvents: boolean;
}

const EventsList: React.FC<Props> = ({events, setEvents, editingEvents}) => {
  const router = useRouter();

  return (
    <ul className={styles.ul}>
      {events.map(event => (
        <li key={event.id} className={styles.eventChip}>
          <EventItem 
            event={event}
            onEventClick={() => router.push(`/rodeos/${encodeURIComponent(event.rodeoId)}/${encodeURIComponent(event.id)}`)}
            setEvents={setEvents} events={events} editingEvents={editingEvents}
          />
        </li>
      ))}
    </ul>
  )
}

export default EventsList;
