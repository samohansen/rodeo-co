import { Box, Button, Typography } from '@mui/material';
import {getSession, useSession, signOut} from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';

const Account: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  console.log(session)
  const user = session?.user;
  const isLoadingUser = status === 'loading';

  // const isNewUser = user.type === 'new';

  // todo: if user.type === 'new', make the user choose admin or participant type
  // ^ this should probably be done in middleware, actually - a forced redirection to /account (this view) until user has a real type
  return (
    <p>Are you a rodeo administrator looking to create rodeos, or a participant?</p>
  )
};

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default Account;
