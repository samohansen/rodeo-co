import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
      <Toolbar>
        breadcrumbs
      </Toolbar>
    </AppBar>
  </>
}

export default MainToolbar;