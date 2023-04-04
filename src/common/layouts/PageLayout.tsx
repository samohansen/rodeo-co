import { ReactNode } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

type Props = {
  children?: ReactNode | ReactNode[];
}

// Use this for any page layout that should never have a leftNav
// (Including if that page has another layout—in that case, wrap this around it)
const PageLayout: React.FC<Props> = ({children}) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default'}} >
      <Toolbar/>
      <main>{children}</main>
    </Box>
  );
};

export default PageLayout;
