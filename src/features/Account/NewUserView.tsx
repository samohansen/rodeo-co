import { Box, Button, Typography, Dialog, Container } from '@mui/material';
import {signIn, useSession} from 'next-auth/react';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { TextField } from "@mui/material";
import DatePicker from "@common/components/DatePicker";
import {TextInput, SelectInput} from '@common/components/RhfFormComponents'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {rodeoImageUrls} from '@common/utils';
import { useRouter, usePathname }  from 'next/navigation';

type Props = {

}

const NewUserView: React.FC<Props> = () => {
  const router = useRouter();
  const path = usePathname();

  const onSubmit = async (data) => {
    const res = await axios.patch(`api/auth/account`, data);
    const {user, token} = res.data;
    // sign in again to force refresh of session after change to user
    await signIn('direct_jwt', {
      token: token,
      user: user,
      // callbackUrl: '/account'
      redirect: false,
    })
  };

  const validationSchema = yup.object().shape({
    type: yup.string().oneOf(['admin', 'participant'])
  });

  const {formState: { errors, isSubmitting }, control, handleSubmit, } = useForm({
    mode: "onBlur",
    defaultValues: {type: ''},
    resolver: yupResolver(validationSchema)
  });

  return (
    <>
      <p>Before you can get started, let us know what type of account you need</p>
      <p>This account setting is permanent, so please choose carefully!</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput 
          label="Account type *"
          name="type"
          control={control}
          menuItems={[
            {label: 'Account type', value: '', disabled: true}, // todo: make the disabled thing actually work
            {label: 'Participant - I want to enter events', value: 'participant'},
            {label: "Administrator - I'm a rodeo producer", value: 'admin'},
          ]}
          style={{width: 320}}
        />
        <Button type="submit" disabled={isSubmitting} variant="contained">Confirm</Button>
      </form>
    </>

  )
};


export default NewUserView;
