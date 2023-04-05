import type { ReactElement } from 'react';
import type { nEventEntry, nRodeo, nRodeoEvent } from '@common/types';
import type { NextPageWithLayout } from '@common/types';
import { PrismaClient } from '@prisma/client'
import PageLayout from '@common/layouts/PageLayout'
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import Box from '@mui/material/Box';
import EntriesList from '@features/EntriesList';
import { getToken } from 'next-auth/jwt';

type Props = {
  entries: nEventEntry[]
}

const prisma = new PrismaClient()
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
        <EntriesList entries={entries}/>
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
