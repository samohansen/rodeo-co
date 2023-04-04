import { ReactNode, useState } from "react";
import Head from "next/head";
import MainToolbar from "@common/navigation/MainToolbar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

type Props = {
  children?: ReactNode | ReactNode[];
}

// This component wraps the whole application. It contains a main navbar.
const RootLayout: React.FC<Props> = ({children}) => {
  return (
    <div>
      <Head>
        <title>RodeoCo</title>
        <meta name="description" content="Capstone by GF, SH, and HH" />
        <link rel="icon" href="/hat-md.png" />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <MainToolbar/>
        {children}
      </Box>
    </div>
  );
};

export default RootLayout;
