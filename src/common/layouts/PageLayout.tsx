import { ReactNode } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

type Props = {
  children?: ReactNode | ReactNode[];
}

// Use this for any page layout without a left nav
// (Including if that page has another layout—in that case, wrap this around it)
const PageLayout: React.FC<Props> = ({children}) => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar/>
      <main>{children}</main>
    </Box>
  );
};

export default PageLayout;