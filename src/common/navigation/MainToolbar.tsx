import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useSession, signOut } from 'next-auth/react';
import logo from 'public/logo.png';
import { Divider } from '@mui/material';
import BasicBreadcrumbs from '@common/navigation/Breadcrumbs'

const MainToolbar: React.FC = () => {
  const {data: session} = useSession();

  return (
    <AppBar position="fixed" sx={{bgcolor:'white', zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <a href='/'> <img src={logo.src} alt="logo" width="150" height="45" /></a>
        <Divider
          orientation='vertical'
          flexItem
          sx={{width: '46px'}} // todo: this is a hack
        />
        <span>
          <BasicBreadcrumbs/>
        </span>
        {session ? (
          <>
            {session.user.name || ''}
            <Button onClick={() => signOut()} sx={{ borderRadius: 'sm', color: '#CF7F49' }}>Sign out</Button>
          </>
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
