import { ReactNode } from "react";
import LeftNav from "@common/navigation/LeftNav";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {getSession, useSession, signOut} from 'next-auth/react';

type Props = {
  children?: ReactNode | ReactNode[];
}

const LeftNavLayout: React.FC<Props> = ({children}) => {
  const { data: session, status } = useSession();

  return (<>
    {!!session && <LeftNav/>}
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default'}} >
      <Toolbar/>
      <main>{children}</main>
    </Box>
  </>);
};

export default LeftNavLayout;
