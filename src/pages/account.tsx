import { Avatar, Box, Button, Typography, Dialog, DialogActions, Divider, DialogContent, DialogTitle, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';
import { useState } from 'react';
import NewUserView from '@features/Account/NewUserView';
import EditAccountForm from '@features/Account/EditAccountForm';


const Account: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(session?.user?.name ?? '');
  const [accountType, setAccountType] = useState(session?.user?.type ?? '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    // gather the data from the form
    const formData = { email: email , name: username, type: accountType };

    // send the data to the server TO DO: create API route
    const response = await fetch('/api/user/updateUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // update the user's session

  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const name = user?.name || user?.email || 'Rodeo Co User';
  const email = user?.email;
  const avatarLetter = name[0].toUpperCase();
  const avatarSrc = user?.image;
  const avatarSize = 100;

  let userType;
  if (user?.type === 'new') {
    userType = 'New';
  } else if (user?.type === 'admin') {
    userType = 'Producer';
  } else {
    userType = 'Participant';
  }

  return (
    <>
      <Box p={4} sx={{fontFamily:'Poppins, sans-serif'}}>
        <Box display="flex" alignItems="top" mb={2} sx={{fontFamily:'Poppins, sans-serif'}}>
          <Avatar
            sx={{
              bgcolor: '#3f51b5',
              fontSize: '6rem',
              width: avatarSize,
              height: avatarSize,
              mr: 2,
            }}
            alt={name}
            src={avatarSrc}
          >
            {avatarSrc ? null : avatarLetter}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom sx={{fontFamily:'Poppins, sans-serif'}}>
              {name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{fontFamily:'inherit'}}>
              Rodeo {userType} 
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{fontFamily:'inherit'}}>
              {user?.email}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditClick}
              sx={{
                color: '#CF7F49',
                borderColor: '#CF7F49',
                '&:hover': {
                  backgroundColor: '#CF7F49',
                  color: '#fff',
                  borderColor: '#CF7F49',
                },
                borderRadius: '25px',
                fontFamily: 'inherit',
              }}

            >
              Edit Profile
            </Button>
          </Box>

          <EditAccountForm 
            isEditing={isEditing} 
            handleCancelClick={handleCancelClick}
            setIsEditing={setIsEditing} 
            username={username} 
            setUsername={setUsername} 
            accountType={accountType} 
            setAccountType={setAccountType}
            handleSaveClick={handleSaveClick}
          />

          {/* Edit Profile Modal 
            <Dialog open={isEditing} onClose={handleCancelClick} sx={{fontFamily: 'Poppins, sans-serif'}}>

              <DialogTitle sx={{fontFamily:'inherit' }}>Edit Profile</DialogTitle>
              <Typography variant="subtitle2" sx={{fontFamily:'inherit', mx: 3}}>
                Choosing an <strong>Account type</strong> is required to proceed.
              </Typography>
                <DialogContent sx={{fontFamily:'inherit'}}>
                  <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{fontFamily:'inherit'}} />
                  <Box sx={{ mt: 2, fontFamily: 'inherit' }}>
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
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={handleCancelClick} 
                    sx={{fontFamily:'inherit', color: '#523638', '&hover': {backgroundColor: '#fbf8f8'}}}>
                      Cancel
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={handleSaveClick} 
                    sx={{
                      color: '#523638',
                      border: '1px solid transparent',
                      '&:hover': { backgroundColor: '#CF7F49', color: 'white', border: '1px solid #CF7F49'}
                      }}>
                      Save
                  </Button>
                </DialogActions>
          </Dialog> */}
        </Box>

        <Divider sx={{ my: 2 }} />
      </Box>
  </>
  );
};

Account.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Account;