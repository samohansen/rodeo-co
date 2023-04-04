import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import logo from 'public/logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import AccountMenu from './AccountMenu';

const MainToolbar: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === 'loading';

  return (
    <AppBar sx={{bgcolor:'white', zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid rgba(0, 0, 0, 0.3)'}} elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <a href='/'> <img src={logo.src} alt="logo" width="150" height="45" /></a>
        {isLoadingUser ? (
          <CircularProgress />
        ) : user ? (
          <AccountMenu user={user}/>
        ) : (
          <>
            <Button href={'/login'} sx={{ marginLeft: 'auto', borderRadius: 'sm', color: '#CF7F49' }}>Log in</Button>
            <Button href={'/register'} sx={{ borderRadius: 'sm', color: '#CF7F49' }}>Sign up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
};

export default MainToolbar;
