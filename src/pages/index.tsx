import { Box, Button, Typography } from '@mui/material';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';
import styles from '@features/Home.module.css';

const Home: NextPageWithLayout = () => {
  return (
    <>  
      <Box className={styles.photoSectionBox}>
        <Box sx={{ mt: 3, width: '100%' }} > {/*Sam was trying to make the text fit within a certain width inside the img*/} 
          <Typography
            variant="h1" 
            sx={{ color: 'common.white', fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 'medium', mb: 5, fontFamily: 'inherit',}} 
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
            Wrangle your rodeos with ease - all in one place!
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
          Easily plan and manage your events
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
          {/* todo: this column is half the width for some reason */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
              <img src="/icon1.png" alt="icon1" width={80} height={80} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
              Flexible rodeos and events
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
              Have full control over the details
            </Typography>
          </Box>
          {/* SECOND COLUMN */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }}>
            <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
              <img src="/icon2.png" alt="icon2" width={80} height={80} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
              Easy to apply
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
              Participants can see your rodeos and enter events autonomously
            </Typography>
          </Box>
          {/* THIRD COLUMN */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '5rem', height: '5rem', mb: 2}}>
              <img src="/icon3.png" alt="icon3" width={80} height={80} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
              Accessible information
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
              Events, participants, and rankings are all here
            </Typography>
          </Box>
        </Box>
      </Box>
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
        <Box >
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
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ px: 5 }} >
          <img src="/cubra.png" alt="cubra" />
        </Box>
      </Box>
    </>
  )
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default Home;
