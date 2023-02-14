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
import RodeoContext from './RodeoContext';
import { formatDate } from '@common/utils';

type Props = {
  onClose?: () => void;
}

const CreateRodeoFormModal: React.FC<Props> = ({onClose}) => {
  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required('Rodeo name is required'),
  //   location: Yup.string(),
  //   date: Yup.date().required('Date is required'),
  //   notes: Yup.string()
  // })

  const { control, handleSubmit, formState: {errors} } = useForm({
    mode: "onBlur"
    // resolver: yupResolver(validationSchema),
  });

  const {rodeos, setRodeos} = useContext(RodeoContext);
  const handleFormSubmit = (data) => {
    axios.post('/api/rodeos', data)
      .then(res => {
        setRodeos([
          ...rodeos, 
          {...res.data, date: formatDate(new Date(res.data.date))}
        ])
      })
    onClose()
  }

  return (<>
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create rodeo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here is the create rodeo form
        </DialogContentText>
        <form>
          <TextInput 
            label="Rodeo name"
            name="name"
            rules={{required: "Rodeo name is required"}}
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
            defaultValue={new Date()}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)}>Submit</Button>
      </DialogActions>
    </Dialog>
  </>)
}

export default CreateRodeoFormModal;