import { ReactNode } from "react";
import LeftNav from "@common/navigation/LeftNav";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

type Props = {
  children?: ReactNode | ReactNode[];
}

const LeftNavLayout: React.FC<Props> = ({children}) => {
  return (<>
    <LeftNav/>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default'}} >
      <Toolbar/>
      <main>{children}</main>
    </Box>
  </>);
};

export default LeftNavLayout;
