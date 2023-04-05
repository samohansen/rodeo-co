import type { nRodeo } from '@common/types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter }  from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

type Props = {
  rodeo: nRodeo;
  onClose?: () => void;
}

const DeleteRodeoModal: React.FC<Props> = ({rodeo, onClose}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleDelete = async () => {
    setIsSubmitting(true)
    await axios.delete(`/api/rodeos/${rodeo.id}`)
    router.replace('/rodeos');
    // setIsSubmitting(false) // change load UI timing with this?
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete rodeo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this rodeo? It can't be undone!
          <br/>
          <strong>Any events and their entries will also be permanently removed.</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleDelete()} disabled={isSubmitting} color='error'>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteRodeoModal;
