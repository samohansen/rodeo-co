import { Button, Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter }  from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { nRodeo } from '@common/types';

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
    // setIsSubmitting(false) // change timing with this
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete rodeo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting a rodeo is risky
        </DialogContentText>
        are you sure you want to delete this rodeo? It can't be undone
        [if participants have entered, warnings, etc]
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleDelete()} disabled={isSubmitting} color='error'>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteRodeoModal;