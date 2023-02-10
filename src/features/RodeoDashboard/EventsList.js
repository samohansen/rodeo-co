import styles from './EventsList.module.css'
import EventItem from './EventItem'
import { useRouter } from 'next/router';


const EventsList = ({id, events}) => {
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