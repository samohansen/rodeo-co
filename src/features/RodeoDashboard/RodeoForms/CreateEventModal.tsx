import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextInput } from '@common/components/RhfFormComponents'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { EventFormModel } from "./CreateEventFormInterface";

type Props = {
  defaultValues: EventFormModel;
  onSubmit: (data: EventFormModel) => Promise<void>;
  onClose: () => void;
}

const CreateEventModal: React.FC<Props> = ({defaultValues, onSubmit, onClose}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Event name is required'),
    minAge: yup.number().typeError('Must be number').nullable().transform((_, val) => (val !== '' ? Number(val) : null)),
    maxAge: yup.number().typeError('Must be number').nullable().transform((_, val) => (val !== '' ? Number(val) : null)),
    fee: yup.number().required('Entry fee amount is required').typeError('must be number'),
    // prizePot: yup.number().typeError('must be number').nullable().transform((_, val) => (val !== '' ? Number(val) : null)),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm<EventFormModel>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create event</DialogTitle>
      <DialogContent>
        <DialogContentText paddingBottom={2}>
          Add an event to your rodeo.
        </DialogContentText>
        <form>
          <Container sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '250px'}} >
            <TextInput 
              label="Event name"
              name="name"
              control={control}
              textFieldProps={{required: true}}
            />
            <TextInput 
              label="Minimum age"
              name="minAge"
              control={control}
              textFieldProps={{ inputProps: {inputMode: 'numeric'} }} // causes keyboard to default to numeric
            />
            <TextInput 
              label="Maximum age"
              name="maxAge"
              control={control}
              textFieldProps={{ inputProps: {inputMode: 'numeric'} }}
            />
            <TextInput 
              label="Entry fee"
              name="fee"
              control={control}
              textFieldProps={{
                inputProps: {inputMode: 'numeric'},
                required: true
              }}
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

export default CreateEventModal;
