import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const MainToolbar = ({leftNavWidth}) => {
  return <>
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${leftNavWidth}px)`, ml: `${leftNavWidth}px` }}
    >
      <Toolbar>
        toolbar contents
      </Toolbar>
    </AppBar>
  </>
}

export default MainToolbar;