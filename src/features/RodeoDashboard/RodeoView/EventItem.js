import {Chip} from '@mui/material'
import {styled} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit';
import styles from './EventsList.module.css'
import {buildEventAgeString} from '@common/utils'
import axios from 'axios';

const EventChip = styled(Chip)(() => ({
  "& .MuiChip-icon": {
    order: 1, // the label has a default order of 0, so this icon goes after the label
    marginRight: "10px", // add some space between icon and delete icon
    cursor: "pointer"
  },
  "& .MuiChip-deleteIcon": {
    order: 2 // since this is greater than an order of 1, it goes after the icon
  }
}))

const EventItem = ({event, onEventClick, setEvents, events, editingEvents}) => {
  const handleDelete = async () => {
    await axios.delete(`/api/rodeos/${event.rodeoId}/${event.id}`)
      .then(res => {
        setEvents(events.filter(e => e.id != event.id))
      })
  }

  return (
    <EventChip 
      className={styles.eventChip}
      label={`${event.name}${buildEventAgeString(event)}`}
      onClick={() => onEventClick(event)}
      {...(editingEvents && {
        onDelete: () => handleDelete(), 
        icon: <EditIcon onClick={() => {}} />
      })}
    />
  )
}

export default EventItem;
