import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import Button from '@mui/material/Button';
import PageLayout from '@common/layouts/PageLayout';
import axios from 'axios';
import { SelectInput } from '@common/components/RhfFormComponents'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {signIn, useSession, signOut} from 'next-auth/react';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DatePicker from "@common/components/DatePicker";
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { TextInput } from '@common/components/RhfFormComponents'
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';

const NewUserView: NextPageWithLayout = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    birthdate: yup.date(),
    type: yup.string().oneOf(['admin', 'participant']).required('Account type is required'),
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: '',
      birthdate: null,
      type: '',
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    const res = await axios.patch(`api/auth/account`, data);
    const {user, token} = res.data;
    // // sign in again to force refresh of session after change to user
    // await signIn('direct_jwt', {
    //   token: token,
    //   user: user,
    //   // callbackUrl: '/account'
    //   redirect: false,
    // })
    await signOut()
  };

  const [accountType, setAccountType] = useState('participant');

  return (
    <Dialog open={true} sx={{fontFamily: 'Poppins, sans-serif'}}>
      <DialogTitle sx={{fontFamily:'inherit'}}>Set Profile</DialogTitle>
        {/* <Typography variant="subtitle2" sx={{fontFamily:'inherit', mx: 3}}>
            Choosing an <strong>Account type</strong> is required to proceed.
        </Typography> */}
      <DialogContent sx={{fontFamily:'inherit'}}>
        <DialogContentText>
          Welcome to Rodeo Co! Let's set your account information. 
          <br/>
          This data will be attached to your rodeos and events, and may be visible to others.
          <br/>
          Choosing an account type is <strong>required</strong> to proceed. This account setting is permanent, so please choose carefully!
          <br/>
          After setting your account details, you will be asked to sign in again.
        </DialogContentText>
        <form>
          <Container sx={{display: 'flex', flexDirection: 'column', gap: 3, width: '320px', paddingTop: 1}} >
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
                  label="Date of birth *"
                  inputRef={ref}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            <SelectInput 
              label="Account type *"
              name="type"
              control={control}
              menuItems={[
                // {label: 'Account type', value: '', disabled: true}, // todo: make the disabled thing actually work
                {label: 'Participant - I want to enter events', value: 'participant'},
                {label: "Administrator - I'm a rodeo producer", value: 'admin'},
              ]}
              style={{width: 320}}
            />
          </Container>
        </form>
        {/* todo: these are way cooler and better than the select, so use them instead */}
        {/* <Box sx={{ mt: 2, fontFamily: 'inherit' }}>
        <Typography variant="subtitle1" sx={{fontFamily:'inherit'}}>Account type</Typography>
        <Button 
            variant={accountType === 'admin' ? 'contained' : 'outlined'} 
            sx={{ 
            mx: 1, 
            borderRadius: '25px',
            fontFamily:'inherit',
            bgcolor: accountType === 'admin' ? '#CF7F49' : 'white',
            '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
            color: accountType === 'admin' ? 'white' : '#CF7F49',
            border: '1px solid #CF7F49'
            }} 
            onClick={() => setAccountType('admin')}>
            Producer
        </Button>
        <Button 
            variant={accountType === 'participant' ? 'contained' : 'outlined'} 
            sx={{ 
            mx: 1, 
            borderRadius: '25px',
            fontFamily:'inherit',
            bgcolor: accountType === 'participant' ? '#CF7F49' : 'white',
            '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
            color: accountType === 'participant' ? 'white' : '#CF7F49',
            border: '1px solid #CF7F49'
            
            }} 
            onClick={() => setAccountType('participant')}>
            Participant
        </Button>
        </Box> */}

      </DialogContent>
      <DialogActions sx={{paddingInline: 2, paddingBlockEnd: 2}}>
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
  )
};

NewUserView.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout includeLeftNav={false}>
      {page}
    </PageLayout>
  ) 
};

export default NewUserView;
