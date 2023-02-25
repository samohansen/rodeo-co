import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';

type Props = {
  leftNavWidth: number;
}

const MainToolbar: React.FC<Props> = ({leftNavWidth}) => {
  return <>
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${leftNavWidth}px)`, ml: `${leftNavWidth}px` }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        breadcrumbs
        <Button color="inherit" sx={{ marginLeft: 'auto' }}>Login</Button>
      </Toolbar>
    </AppBar>
  </>
}

export default MainToolbar;