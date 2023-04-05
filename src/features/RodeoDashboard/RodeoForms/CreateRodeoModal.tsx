import type { RodeoFormModel } from "./CreateRodeoFormInterface";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DatePicker from "@common/components/DatePicker";
import { TextInput, SelectInput} from '@common/components/RhfFormComponents'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {rodeoImageUrls} from '@common/utils';

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
    imgSrc: yup.string(),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm<RodeoFormModel>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create rodeo</DialogTitle>
      <DialogContent>
        <DialogContentText paddingBottom={2}>
          Enter key rodeo information here; you'll be able to add events later.
        </DialogContentText>
        <form>
          <Container sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '250px'}} >
            <TextInput 
              label="Rodeo name"
              name="name"
              control={control}
              textFieldProps={{required: true}}
            />
            <TextInput 
              label="Location"
              name="location"
              control={control}
              textFieldProps={{required: true}}
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
                  label="Date *"
                  inputRef={ref}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            <SelectInput 
              label="Rodeo card image *"
              name="imgSrc"
              control={control}
              menuItems={[
                {label: 'Imgur 1', value: rodeoImageUrls[9]},
                {label: 'Bunny 1', value: rodeoImageUrls[10]},
                {label: 'Rodeo 1', value: rodeoImageUrls[0]},
                {label: 'Rodeo 2', value: rodeoImageUrls[1]},
                {label: 'Rodeo 3', value: rodeoImageUrls[2]},
                {label: 'Rodeo 4', value: rodeoImageUrls[3]},
                {label: 'Rodeo 5', value: rodeoImageUrls[4]},
                {label: 'Rodeo 6', value: rodeoImageUrls[5]},
                {label: 'Rodeo 7', value: rodeoImageUrls[6]},
                {label: 'Rodeo 8', value: rodeoImageUrls[7]},
                {label: 'Rodeo 9', value: rodeoImageUrls[8]},
              ]}
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
      <DialogActions sx={{paddingInline: 2, paddingBlockEnd: 2}}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} variant='contained'>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateRodeoModal;
