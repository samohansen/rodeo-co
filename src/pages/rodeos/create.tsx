import FormDialog from "@common/FormDialogue";
import { useRouter } from 'next/router'
import { Button, Dialog } from '@mui/material';
import { useEffect } from 'react'
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const CreateRodeo = () => {
  const router = useRouter()
  const addRodeo = (data) => axios.post('/api/rodeos', data);

  const handleClose = () => {
    router.push('/rodeos')
  }

  const handleSubmit = (data) => {
    addRodeo(data)
    handleClose()
  }

  return (<>
    {/* <Dialog 
      open={true}
      onClose={() => router.push('/rodeos')}
    >
      create form
    </Dialog> */}
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Create rodeo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>

    
    {/* <FormDialog pathName={router.pathname}></FormDialog> */}
  </>)

}

export default CreateRodeo;