import { Button, Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from "@mui/material";
import DatePicker from "@common/components/DatePicker";
import {TextInput} from '@common/components/RhfFormComponents'
import * as Yup from 'yup';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react';
import { formatDate } from '@common/utils';
import type { RodeoEvent, Rodeo } from '@prisma/client';

type Props = {
  events: RodeoEvent[];
  setEvents: (events: RodeoEvent[]) => void;
  parentRodeo: Rodeo['id'];
  onClose?: () => void;
}

const CreateEventFormModal: React.FC<Props> = ({
  events, // only passed to update the full list of events
  setEvents, 
  parentRodeo,
  onClose,
}) => {
  const { control, handleSubmit, formState: {errors} } = useForm({
    mode: "onBlur"
  });

  const handleFormSubmit = (data) => {
    const parsedData = { // this is a hack until I figure out how better to use react-hook-form (or we switch to a different form manager)
      ...data,
      minAge: parseInt(data.minAge),
      maxAge: parseInt(data.maxAge),
      fee: parseInt(data.fee),
      prize: parseInt(data.prize),
    }
    axios.post(`/api/rodeos/${parentRodeo}`, parsedData)
      .then(res => {
        setEvents([
          ...events, 
          {...res.data, time: formatDate(new Date(res.data.date))}
        ])
      })
    onClose()
  }

  return (<>
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here is the create event form
        </DialogContentText>
        <form>
          <TextInput 
            label="Event name"
            name="name"
            rules={{required: "Event name is required"}}
            control={control}
            //defaultValue= ""
          />
          <TextInput 
            label="Minimum age"
            name="minAge"
            rules={{
              valueAsNumber: true,
              // pattern: {value: /[0-9]*/, message: "Enter a number"},
              min: {value: 0, message: "Age must be > 0"},
              max: 99
            }}
            control={control}
            textFieldProps={{ inputProps: {inputMode: 'numeric'} }} // causes keyboard to default to numeric
          />
          <TextInput 
            label="Maximum age"
            name="maxAge"
            control={control}
            textFieldProps={{
              inputProps: {
                inputMode: 'numeric', 
                pattern: '[0-9]*',
                // min: 0,
                // max: 99
              }
            }}
          />
          <TextInput 
            label="Entry fee"
            name="fee"
            control={control}
            textFieldProps={{
              inputProps: {
                inputMode: 'numeric', 
                pattern: '[0-9]*',
              }
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)}>Submit</Button>
      </DialogActions>
    </Dialog>
  </>)
}

export default CreateEventFormModal;