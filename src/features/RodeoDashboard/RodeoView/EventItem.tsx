import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useState } from 'react';
import { useRouter, usePathname }  from 'next/navigation';
import {buildEventTitleString} from '@common/utils'
import CreateEventFormInterface from '../RodeoForms/CreateEventFormInterface';
import LoadingBackdrop from '@common/navigation/LoadingBackdrop';
import styles from './EventItem.module.css'

const EventItem = ({event, onEventClick, editingEvents}) => {
  const router = useRouter();
  const path = usePathname();
  
  // todo: error handling (the load gets stuck forever on a failed delete, right now)
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true)
    await axios.delete(`/api/rodeos/${event.rodeoId}/${event.id}`)
    router.replace(path);
    // setIsLoading(false) // this changes the timing somewhat
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = async () => {
    setModalOpen(!modalOpen)
  }

  return (<>
    <Button 
      className={styles.chip}
      {...(editingEvents ? {
        onClick: undefined,
        disableRipple: true,
        sx: {'&:hover': {cursor: 'default'}}
      } : {
        onClick: () => onEventClick(event),
      })}
    >
      <Box component='span' className={styles.chipText}>
        {buildEventTitleString(event)}
      </Box>
      {editingEvents ? (
        <Stack direction='row' sx={{marginRight: '-3px'}}>
          <EditIcon onClick={handleEdit} className={styles.chipIcon} sx={{marginRight: '3px'}}/>
          <CancelIcon onClick={handleDelete} className={styles.chipIcon} />
        </Stack>
      ) : null }
    </Button>
    {modalOpen ? (
      <CreateEventFormInterface 
        editing={true}
        event={event}
        onClose={() => setModalOpen(false)}
      />
    ) : null}
    <LoadingBackdrop isOpen={isLoading}/>
  </>
  )
}

export default EventItem;
