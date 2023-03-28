import type { RodeoFormModel } from "./CreateRodeoFormInterface";
import { Button, Dialog, Container } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from "@mui/material";
import DatePicker from "@common/components/DatePicker";
import {TextInput} from '@common/components/RhfFormComponents'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  defaultValues: RodeoFormModel;
  onSubmit: (data: RodeoFormModel) => Promise<void>;
  onClose: () => void;
}

const CreateRodeoModal: React.FC<Props> = ({defaultValues, onSubmit, onClose}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Rodeo name is required'),
    location: yup.string().required('Rodeo location is required'),
    date: yup.date().required('Date is required'),
    notes: yup.string(),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm<RodeoFormModel>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create rodeo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new rodeo. You will be able to add events later.
        </DialogContentText>
        <form>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px', /* row-gap column gap */
            rowGap: '10px',
            columnGap: '20px',
        }} >
          <TextInput 
            label="Rodeo name"
            name="name"
            control={control}
          />
          
          <TextInput 
            label="Location"
            name="location"
            control={control}
          />
          <Controller 
            name="date"
            control={control}
            // defaultValue={new Date(Date.now() + 7*24*60*60*1000)} \\ todo: get this to actually work
            render={({field: {ref, ...fieldProps}}) => (
              <DatePicker 
                {...fieldProps}
                value={fieldProps.value}
                onChange={e => fieldProps.onChange(e)}
                label="Date"
                inputRef={ref}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          />
          <TextInput
            label="Other info"
            name="notes"
            control={control}
            textFieldProps={{multiline: true}}
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

export default CreateRodeoModal;
