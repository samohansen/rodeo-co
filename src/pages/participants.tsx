import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageLayout from '@common/layouts/PageLayout';

const Participants: NextPageWithLayout = () => {
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
              Participant tracking
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
        Track season rankings
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
        {/* todo: this column is half the width for some reason */}
        {/* FIRST COLUMN */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
            <img src="/icon1.png" alt="icon1" width={80} height={80} />
          </Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
            View rankings
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
            See how entrants ranked in real time
          </Typography>
        </Box>

        {/* SECOND COLUMN */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'inherit' }}>
          <Box sx={{ width: '5rem', height: '5rem', mb: 2 }}>
            <img src="/icon2.png" alt="icon2" width={80} height={80} />
          </Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
            Publish results
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
            When you're ready, update everyone with one click
          </Typography>
        </Box>

        {/* THIRD COLUMN */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: '5rem', height: '5rem', mb: 2}}>
            <img src="/icon3.png" alt="icon3" width={80} height={80} />
          </Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary', fontFamily: 'inherit' }}>
            Get insights
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontFamily: 'inherit' }}>
            See trends across participants, horses, and event types
          </Typography>
        </Box>
      </Box>
    </Box>
    </>
  )
};

Participants.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default Participants;
