import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signIn, signOut} from 'next-auth/react';


export default function Home() {

  const{data:session} = useSession();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({session}) : Guest()}
    </Box>
  )
}

// Guest
function Guest(){
  return (
    <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>Guest Homepage</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href={'/login'} passHref>
          <Button sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white' }}>Sign In</Button>
        </Link>
      </Box>
    </Container>
  )
}

// Authorized User
function User({session}){
  return(
    <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>Authorized User Homepage</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Typography variant="h5">{session.user.name}</Typography>
        <Typography variant="h5">{session.user.email}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white', mr: 2 }}>Sign Out</Button>

        <Link href={'/profile'} passHref>
          <Button sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white' }}>Profile Page</Button>
        </Link>
      </Box>
    </Container>
  )
}