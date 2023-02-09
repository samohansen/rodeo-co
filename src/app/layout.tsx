import { ReactNode } from "react";
import type { NextPage } from "next";
import type { LeftNavMenuItem } from "@common/Types";
import Head from "next/head";
import LeftNav from "@common/navigation/LeftNav";
import MainToolbar from "@common/navigation/MainToolbar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { HatIcon } from "@common/content/mockData";

type Props = {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({children}) => {
  const leftNavWidth: number = 240;
  const leftNavMenuItems: LeftNavMenuItem[] = [{
    label: 'Home',
    path: '/',
    icon: <HomeIcon/>
  }, {
    label: 'Rodeos',
    path: '/rodeos',
    icon: <HatIcon />
  }, {
    label: 'Participants',
    path: '/participants',
    icon: <PeopleIcon />
  }]


  return (
    <html lang="en">
      <body>
        <div>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MainToolbar leftNavWidth={leftNavWidth}/>
            <LeftNav 
              menuItems={leftNavMenuItems}
              width={leftNavWidth}
            />

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
      </body>
    </html>
  );
};

export default RootLayout;