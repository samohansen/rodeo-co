import { ReactNode } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LeftNav from "@common/navigation/LeftNav";
import { useSession } from 'next-auth/react';

type Props = {
  children?: ReactNode | ReactNode[];
  includeLeftNav?: boolean;
}

// Use this for every page layout (including if that page has another layout—in that case, wrap this around it)
// If the page should never have a leftNav, pass includeLeftNav: false
const PageLayout: React.FC<Props> = ({children, includeLeftNav = true}) => {
  const { data: session, status } = useSession();

  return (
    <>
      {includeLeftNav ? (
        status === 'authenticated' && <LeftNav userType={session.user.type} />
      ) : null}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default'}} >
        <Toolbar/>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default PageLayout;
