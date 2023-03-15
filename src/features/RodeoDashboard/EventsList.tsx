import styles from './EventsList.module.css'
import EventItem from './EventItem'
import { useRouter } from 'next/router';
import type { RodeoEvent, Rodeo } from '@prisma/client';

type Props = {
  id: Rodeo['id'];
  events: RodeoEvent[];
}

const EventsList: React.FC<Props> = ({id, events}) => {
  const router = useRouter();

  return (
    <ul className={styles.ul}>
      {events.map(event => (
        <li key={event.id} className={styles.eventChip}>
          <EventItem 
            event={event}
            onEventClick={() => router.push(`/rodeos/${encodeURIComponent(id)}/event/${encodeURIComponent(event.id)}`)}
          />
        </li>
      ))}
    </ul>
  )
}

export default EventsList;