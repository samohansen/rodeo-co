import type { ReactElement } from 'react';
import type { nEventEntry, NextPageWithLayout } from '@common/types';
import prisma from 'src/prisma';
import { getToken } from 'next-auth/jwt';import Box from '@mui/material/Box';
import PageLayout from '@common/layouts/PageLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import EntriesList from '@features/EntriesList';
import Typography from "@mui/material/Typography";

type Props = {
  entries: nEventEntry[]
}

export async function getServerSideProps({req, res, query}) {
  const token = await getToken({req})

  const entries = await prisma.eventEntry.findMany({
    where: { participantId: token.sub },
    include: { 
      event: true 
    }
  })

  return {
    props: {
      entries: JSON.parse(JSON.stringify(entries))
    }
  }
}

// todo: show actually helpful info
const EntriesView: NextPageWithLayout<Props> = ({entries}) => {
  return (
    <RodeoDashboardLayout pageTitle='All entries' >
      <Box sx={{padding: 3}}>
        {!!entries.length ? (
          <EntriesList entries={entries}/>
        ) : (
          <Typography variant='subtitle1' color="text.secondary">
            You have not entered any events.
          </Typography>
        )}
      </Box>
    </RodeoDashboardLayout>
  )
}

EntriesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default EntriesView;
