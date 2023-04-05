import { Button, Container, Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {TextInput} from '@common/components/RhfFormComponents'
import type { EventFormModel } from "./CreateEventFormInterface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EntryModel } from './EventEntryInterface';

type Props = {
  defaultValues: EntryModel;
  onSubmit: (data: EntryModel) => Promise<void>;
  onClose: () => void;
}

const CreateEntryModal: React.FC<Props> = ({defaultValues, onSubmit, onClose}) => {
  const validationSchema = yup.object().shape({
    horseName: yup.string().required('Horse name is required'),
    // eventId: yup.string().required('Event id is required'),
    // participantId: yup.string().required('Participant id is required'),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm<EntryModel>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter event</DialogTitle>
      <DialogContent>
        {/* <DialogContentText paddingBottom={2}>
          Add an event to your rodeo.
        </DialogContentText> */}
        <form>
          <Container sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '250px'}} >
            <TextInput 
              label="Horse name"
              name="horseName"
              control={control}
              textFieldProps={{required: true}}
            />
           </Container>
        </form>
      </DialogContent>
      <DialogActions sx={{paddingInline: 2, paddingBlockEnd: 2}}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateEntryModal;
