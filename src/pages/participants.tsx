import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import {useSession, signOut} from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import LeftNavLayout from '@common/layouts/LeftNavLayout';
import classes from  '../styles/Home.module.css';


const Home: NextPageWithLayout = () => {
  const {data: session} = useSession();

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
        backgroundImage: 'url(/desertimage2.jpg)',
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
            Participant Tracking
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
           Coming Soon!
          </Typography>
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
      Track Participants' Season Rankings
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
          View Event Rankings
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
          See how participants ranked in real time
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
          Participants can join rodeos from the site.
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
