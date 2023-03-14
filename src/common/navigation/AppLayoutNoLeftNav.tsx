import { ReactNode } from "react";
import type { NextPage } from "next";
import type { LeftNavMenuItem } from "@common/types";
import Head from "next/head";
import LeftNav from "@common/navigation/LeftNav";
import MainToolbar from "@common/navigation/MainToolbar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import HatIcon from "@common/components/HatIcon.js";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

type Props = {
  children?: ReactNode | ReactNode[];
}

const AppLayout: React.FC<Props> = ({children}) => {
  const leftNavWidth: number = 0;
  const leftNavMenuItems: LeftNavMenuItem[] = [{
    label: 'Home',
    path: '/',
    icon: <HomeIcon/>
  }, {
    label: 'Rodeos',
    path: '/rodeos',
    icon: <EventAvailableIcon />
  }, {
    label: 'Participants',
    path: '/participants',
    icon: <PeopleIcon />
  }]

  return (
    <div>
      <Head>
        <title>Rodeo Co</title>
        <meta name="description" content="Capstone by S.H, H.H., & G.F." />
        <link rel="icon" href="/hat-md.png" />
      </Head>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MainToolbar leftNavWidth={leftNavWidth}/>
        {/* app body */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar/>
          {/* (actual app body contents) */}
          <main>{children}</main>
          
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;