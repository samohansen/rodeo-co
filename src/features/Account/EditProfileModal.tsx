import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import type { ProfileModel } from './EditProfileInterface';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DatePicker from "@common/components/DatePicker";
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { TextInput } from '@common/components/RhfFormComponents'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  defaultValues: ProfileModel;
  onSubmit: (data: ProfileModel) => Promise<void>;
  onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({defaultValues, onSubmit, onClose}) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    birthdate: yup.date(),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm<ProfileModel>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  return (
    <Dialog open={true} onClose={onClose} sx={{fontFamily: 'Poppins, sans-serif'}}>
      <DialogTitle sx={{fontFamily:'inherit'}}>Edit Profile</DialogTitle>
        {/* <Typography variant="subtitle2" sx={{fontFamily:'inherit', mx: 3}}>
            Choosing an <strong>Account type</strong> is required to proceed.
        </Typography> */}
      <DialogContent sx={{fontFamily:'inherit'}}>
        <form>
          <Container sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '250px', paddingTop: 1}} >
            <TextInput 
              label="Full name"
              name="name"
              control={control}
              textFieldProps={{required: true}}
            />
            <Controller 
              name="birthdate"
              control={control}
              render={({field: {ref, ...fieldProps}}) => (
                <DatePicker 
                  {...fieldProps}
                  value={fieldProps.value}
                  onChange={e => fieldProps.onChange(e)}
                  label="Birthday"
                  inputRef={ref}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Container>
        </form>
        {/* <Box sx={{ mt: 2, fontFamily: 'inherit' }}>
        <Typography variant="subtitle1" sx={{fontFamily:'inherit'}}>Account type</Typography>
        
        <Button 
            variant={props.accountType === 'admin' ? 'contained' : 'outlined'} 
            sx={{ 
            mx: 1, 
            borderRadius: '25px',
            fontFamily:'inherit',
            bgcolor: props.accountType === 'admin' ? '#CF7F49' : 'white',
            '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
            color: props.accountType === 'admin' ? 'white' : '#CF7F49',
            border: '1px solid #CF7F49'
            }} 
            onClick={() => props.setAccountType('admin')}>
            Producer
        </Button>
        <Button 
            variant={props.accountType === 'participant' ? 'contained' : 'outlined'} 
            sx={{ 
            mx: 1, 
            borderRadius: '25px',
            fontFamily:'inherit',
            bgcolor: props.accountType === 'participant' ? '#CF7F49' : 'white',
            '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
            color: props.accountType === 'participant' ? 'white' : '#CF7F49',
            border: '1px solid #CF7F49'
            
            }} 
            onClick={() => props.setAccountType('participant')}>
            Participant
        </Button>
        </Box> */}
        <DialogContentText paddingTop={2}>
          You will be asked to sign in again to see your changes.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{paddingInline: 2, paddingBlockEnd: 2}}>
        <Button onClick={onClose} sx={{fontFamily:'inherit', color: '#523638', '&hover': {backgroundColor: '#fbf8f8'}}}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} variant='outlined' 
          sx={{
            color: '#CF7F49',
            // border: '1px solid transparent',
            borderColor: '#CF7F49',
            '&:hover': { backgroundColor: '#CF7F49', color: 'white', border: '1px solid #CF7F49'}
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileModal;
