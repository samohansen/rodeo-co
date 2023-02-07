import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import {CrumbsContext} from 'src/features/CrumbsContext';

type Props = {
  leftNavWidth: number;
}

const MainToolbar: React.FC<Props> = ({leftNavWidth}) => {
  const crumbs = useContext(CrumbsContext);

  return <>
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${leftNavWidth}px)`, ml: `${leftNavWidth}px` }}
    >
      <Toolbar>
        {crumbs}
      </Toolbar>
    </AppBar>
  </>
}

export default MainToolbar;