import {Chip} from '@mui/material'
import {styled} from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit';
import styles from './EventsList.module.css'
import {buildEventTitleString} from '@common/utils'
import axios from 'axios';
import CreateEventFormInterface from '../RodeoForms/CreateEventFormInterface';
import { useState } from 'react';
import { useRouter, usePathname }  from 'next/navigation';
import LoadingBackdrop from '@common/navigation/LoadingBackdrop';

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

// todo: add error handling to delete
const EventItem = ({event, onEventClick, editingEvents}) => {
  const router = useRouter();
  const path = usePathname();
  
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true)
    await axios.delete(`/api/rodeos/${event.rodeoId}/${event.id}`)
    router.replace(path); // forces a client-side transition to same route, refreshing server side props but maintaining tab state (i think)
    // setIsLoading(false) // change timing with this
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = async () => {
    setModalOpen(!modalOpen)
  }

  return (<>
    <EventChip 
      className={styles.eventChip}
      label={buildEventTitleString(event)}
      onClick={editingEvents ? undefined : () => onEventClick(event)}
      {...(editingEvents && {
        onDelete: () => handleDelete(),
        icon: <EditIcon onClick={() => handleEdit()} />
      })}
    />
    {modalOpen ? (
      <CreateEventFormInterface 
        editing={true}
        event={event}
        rodeoId={event.rodeoId}
        onClose={() => setModalOpen(false)}
      />
    ) : null}
    <LoadingBackdrop isOpen={isLoading}/>
  </>
  )
}

export default EventItem;
