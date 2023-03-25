import { ReactNode } from "react";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

type Props = {
  pageTitle: string;
  back?: {
    path: string;
    text?: string;
  }
  rightHeaderComponent?: any;
  children?: ReactNode | ReactNode[];
}

const RodeoDashboardLayout: React.FC<Props> = ({children, pageTitle, back, rightHeaderComponent}) => {
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Box>
            {back ? (
              <Link href={back.path} underline="hover" variant='body2'>
                <Stack direction="row" alignItems="center">
                  <ChevronLeft/>
                  {back.text}
                </Stack>
              </Link>
            ) : null}
            <h1 style={{margin: 0}}>{pageTitle}</h1>
          </Box>
          <Box>
            {rightHeaderComponent}
          </Box>
        </Stack>
      </Box>
      <Box sx={{padding: 2}}> 
        {children}
      </Box>
    </Box>
  );
};

export default RodeoDashboardLayout;