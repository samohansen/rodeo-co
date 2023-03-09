import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import logo from '@../../public/logo.png';


type Props = {
  leftNavWidth: number;
}

function handleSignOut(){
  signOut();
}

const MainToolbar: React.FC<Props> = ({leftNavWidth}) => {
  return <>
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${leftNavWidth}px)`, ml: `${leftNavWidth}px`, bgcolor:'white'}}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            <MenuIcon />
        </IconButton> */}
        <a href='/'> <img src={logo.src} alt="logo" width="150" height="45" /></a> 
          breadcrumbs
          {/* If session, show user name and sign out button, else show sign in and sign up buttons */}

          <Button href={'/login'} sx={{ marginLeft: 'auto', borderRadius: 'sm', color: '#CF7F49' }}>Sign In</Button>
          |
          <Button href={'/register'} sx={{ borderRadius: 'sm', color: '#CF7F49' }}>Sign Up</Button>
          |
          <Button onClick={handleSignOut} sx={{ borderRadius: 'sm', color: '#CF7F49' }}>Sign Out</Button>

      </Toolbar>
    </AppBar>
  </>
}

export default MainToolbar;