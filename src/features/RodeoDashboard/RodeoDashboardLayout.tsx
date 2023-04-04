import { ReactNode } from "react";
import React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

type Props = {
  pageTitle: string;
  back?: {
    linkText?: string;
  } & ({
    path: string;
    onClick?: never;
  } | {
    path?: never;
    onClick: () => void;
  })
  rightHeaderComponent?: any;
  children?: ReactNode | ReactNode[];
}

const RodeoDashboardLayout: React.FC<Props> = ({children, pageTitle, back, rightHeaderComponent}) => {
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginInline: 3, paddingTop: 3, paddingBottom: 2}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Box>
            {back ? (
              <Link underline="hover" variant='body2' {...(
                back.path && {href: back.path} || 
                back.onClick && {onClick: back.onClick, component: 'button'}
              )}>
                <Stack direction="row" alignItems="center">
                  <ChevronLeft/>
                  {back.linkText}
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
      <Box> 
        {children}
      </Box>
    </Box>
  );
};

export default RodeoDashboardLayout;
