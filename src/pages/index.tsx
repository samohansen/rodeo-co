import { Box, Button, Typography } from '@mui/material';
import {getSession, useSession, signOut} from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import LeftNavLayout from '@common/layouts/LeftNavLayout';

const session = getSession();

if (session) {
  console.log('index.tsx session: ');
  console.log(session);
}

const Home: NextPageWithLayout = () => {

  return (
<>  
    {/* FIRST SECTION */}
    <Box
      sx={{
        height: 'calc(100vh / 2.75)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
        backgroundImage: 'url(/desertimage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'left',
        paddingLeft: '4rem',
        paddingRight: '4rem', 
        fontFamily: 'Poppins, sans-serif',
        '@media (min-width: 1000px)': {
          paddingLeft: '10rem',
          paddingRight: '10rem',
        }
      }}
      >
      <Box
        // Sam was trying to make the text fit within a certain width inside the img
        sx={{
          mt: 3,
          width: '100%',
        }}
      >
        <Typography
            variant="h1"
            sx={{ 
              color: 'common.white', 
              fontSize: { xs: '3rem', md: '5rem' }, 
              fontWeight: 'medium',
              mb: 5,
              fontFamily: 'inherit',
            }}
          >
            Rodeo Co
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'common.white',
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 'light',
              mb: 5,
              fontFamily: 'inherit'
            }}
          >
            Plan, manage, and wrangle your rodeos with ease - all in one place!
          </Typography>
          <Button
            href='/rodeos'
            variant="contained"
            sx={{
              color: 'common.white',
              bgcolor: '#CF7F49',
              '&:hover': { bgcolor: '#9b5729' },
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              fontSize: '0.9rem',
              mt: 0,
              borderRadius: '25px',
              alignSelf: 'flex-start',
              fontFamily: 'inherit',
            }}
          >
          View Rodeos
        </Button>
      </Box>
  </Box>

{/* SECOND SECTION */}
<Box
    sx={{
      height: 'calc(100vh / 2.75)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'common.white',
      textAlign: 'center',
      mt: 10,
      mb: 5,
    }}
  >
    <Typography
      variant="h3"
      sx={{
        color: 'text.primary',
        fontWeight: 'bold',
        mb: 5,
        fontFamily: 'inherit',
      }}
    >
      Easily Plan and Manage Your Events
    </Typography>

    {/* THREE COLUMNS */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        maxWidth: '80%',
        margin: '0 auto',
      }}
    >
      {/* FIRST COLUMN */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
          <img src="/icon1.png" alt="icon1" width={80} height={80} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
          Create Rodeos and Add Events
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
          Have full control over the events you create
        </Typography>
      </Box>

      {/* SECOND COLUMN */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }}>
        <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
          <img src="/icon2.png" alt="icon2" width={80} height={80} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
          Easy to Apply
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
          Participants can join your rodeos from the site. No work from you is required.
        </Typography>
      </Box>

      {/* THIRD COLUMN */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '5rem', height: '5rem', mb: 2}}>
          <img src="/icon3.png" alt="icon3" width={80} height={80} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
          Accessible Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
          Events, participants, and rankings will all be stored in one place.
        </Typography>
      </Box>
    </Box>
  </Box>

  {/* THIRD SECTION */}
  <Box
    sx={{
      height: 'calc(100vh / 2.75)',
      backgroundColor: 'grey.300',
      mt: 5,
      mb: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '4rem',
      paddingRight: '4rem',
      '@media (min-width: 1000px)': {
        paddingLeft: '10rem',
        paddingRight: '10rem',
      }
    }}
  >
    {/* Left column */}
    <Box sx={{
      
      }}>
      <Typography variant="h3" sx={{fontWeight: 'bold', color: 'text.primary', fontFamily: 'inherit'}}>
        Dedicated to tradition
      </Typography>
      <Typography variant="body1" sx={{color: 'text.primary', my: 2, fontFamily: 'inherit', mt: 3, mb: 3,}}>
        Rodeo Co. works with local youth rodeo clubs to ensure we have the best
        product possible.
      </Typography>
      <Button
        href="/register" 
        variant="contained" 
        sx={{
            color: 'common.white',
            bgcolor: '#CF7F49',
            '&:hover': { bgcolor: '#9b5729' },
            textTransform: 'uppercase',
            letterSpacing: '0.1rem',
            fontSize: '0.9rem',
            mt: 0,
            borderRadius: '25px',
            alignSelf: 'flex-start',
            fontFamily: 'inherit',
          }}>
        
        Sign Up
      </Button>
    </Box>
    {/* Right column */}
    <Box sx={{
      px: 5,
      }}>
      <img src="/cubra.png" alt="cubra" />
    </Box>
  </Box>

</>)
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default Home;
