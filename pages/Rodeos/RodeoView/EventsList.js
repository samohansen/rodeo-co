import styles from './EventsList.module.css'
import EventItem from './EventItem'


const EventsList = ({events, onEventClick}) => {


  return (
    <ul className={styles.ul}>
      {events.map(event => (
        <li key={event.eventId} className={styles.eventChip}>
          <EventItem 
            event={event}
            onEventClick={onEventClick}
          />
        </li>
      ))}
    </ul>
  )
}

export default EventsList;