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

type Props = {
  defaultValues: EventFormModel;
  onSubmit: (data: EventFormModel) => Promise<void>;
  onClose: () => void;
}

const CreateEventModal: React.FC<Props> = ({defaultValues, onSubmit, onClose}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Event name is required'),
    minAge: yup.number().typeError('must be number').nullable().transform((_, val) => (val !== '' ? Number(val) : null)),
    maxAge: yup.number().typeError('must be number').nullable().transform((_, val) => (val !== '' ? Number(val) : null)),
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
        <DialogContentText>
          Add events to your rodeo.
        </DialogContentText>
        <form>
          <Container
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px', /* row-gap column gap */
            rowGap: '10px',
            columnGap: '20px',
        }} >
          <TextInput 
            label="Event name"
            name="name"
            control={control}
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
           </Container>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateEventModal;
