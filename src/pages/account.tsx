import { Avatar, Box, Button, Typography, Dialog, DialogActions, Divider, DialogContent, DialogTitle, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';
import OpenModalButton from '@common/navigation/OpenModalButton';
import EditProfileInterface from '@features/Account/EditProfileInterface';
import { PrismaClient, User } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@api/auth/[...nextauth]';

const prisma = new PrismaClient()
export async function getServerSideProps (context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const user = await prisma.user.findUnique({
    where: {id: session.user.id}
  })

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    }
  }
}

type Props = {
  user: User;
}

const ProfileView: NextPageWithLayout<Props> = ({user}) => {
  // WARNING: user session will not be up-to-date with profile state after changes

  const displayName = user?.name || user?.email;
  const avatarSrc = user?.image || null;
  const isAdmin = user?.type === 'admin';

  return (
    <Box p={4} sx={{fontFamily:'Poppins, sans-serif'}}>
      <Box display="flex" alignItems="top" mb={2} sx={{fontFamily:'Poppins, sans-serif'}}>
        <Avatar
          sx={{
            bgcolor: '#3f51b5',
            fontSize: '6rem',
            width: 100,
            height: 100,
            mr: 2,
          }}
          alt={displayName}
          src={avatarSrc}
        >
          {avatarSrc ? null : displayName?.charAt(0).toUpperCase() || ''}
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom sx={{fontFamily:'Poppins, sans-serif'}}>
            {displayName}
          </Typography>
          {isAdmin && (
            <Typography variant="subtitle1" gutterBottom sx={{fontFamily:'inherit'}}>
              Rodeo producer
            </Typography>
          )}
          <Typography variant="subtitle1" gutterBottom sx={{fontFamily:'inherit'}}>
            {user?.email}
          </Typography>
          <OpenModalButton buttonText='Edit profile'
            buttonProps={{
              variant: 'outlined',
              color: 'primary',
              sx: {
                color: '#CF7F49',
                borderColor: '#CF7F49',
                '&:hover': {
                  backgroundColor: '#CF7F49',
                  color: '#fff',
                  borderColor: '#CF7F49',
                },
                borderRadius: '25px',
                fontFamily: 'inherit',
              }
            }}
          >
            <EditProfileInterface
              user={user}
            />
          </OpenModalButton>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

ProfileView.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>
    {page}
  </PageLayout>;
};

export default ProfileView;
