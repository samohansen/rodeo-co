import type { ReactElement } from 'react';
import type { nRodeo, NextPageWithLayout } from '@common/types';
import { PrismaClient } from '@prisma/client'
import { useMemo, useState } from "react";
import { partitionRodeos } from "@common/utils";
import OpenModalButton from '@common/navigation/OpenModalButton';
import PageLayout from '@common/layouts/PageLayout'
import TabPanel from '@common/dataDisplay/TabPanel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import CreateRodeoFormInterface from '@features/RodeoDashboard/RodeoForms/CreateRodeoFormInterface';
import RodeosGrid from '@features/RodeoDashboard/RodeosGrid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@api/auth/[...nextauth]';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation'
import LoadingBackdrop from '@common/navigation/LoadingBackdrop';

const prisma = new PrismaClient()
export async function getServerSideProps (context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isAdmin = session.user.type === "admin";

  const rodeos = await prisma.rodeo.findMany({
    orderBy: { date: 'asc' },
    where: isAdmin ? { adminId: session.user.id } : {},
    include: {
      admin: {
        select: {name: true, email: true}
      }
    }
  });

  return {
    props: {
      rodeos: JSON.parse(JSON.stringify(rodeos)),
      isAdmin: isAdmin
    }
  }
}

type Props = {
  rodeos: nRodeo[];
  isAdmin: boolean;
}

const RodeoDashboard: NextPageWithLayout<Props> = ({rodeos = [], isAdmin}) => {
  const router = useRouter();
  const pathName = usePathname()
  const [isLoading, setIsLoading] = useState(false);

  const runSeed = async () => {
    setIsLoading(true);
    await axios.get(`api/rodeos/seed`);
    router.replace(pathName);
    setIsLoading(false);
  }

  const [pastRodeos, futureRodeos] = useMemo(
    () => partitionRodeos(rodeos), 
    [rodeos]
  );

  return (
    <RodeoDashboardLayout
      pageTitle='Rodeos'
      rightHeaderComponent={isAdmin && (
        <OpenModalButton buttonText='Add new rodeo'>
          <CreateRodeoFormInterface setIsLoading={setIsLoading}/>
        </OpenModalButton>
      )}
    >
      {isAdmin && rodeos.length === 0 ? (
        <Box sx={{padding: 3}}>
          <Box>
            <Typography variant='subtitle1' color="gray">
              There are no rodeos to display. <br/>
            </Typography>
            <Typography variant='subtitle2' color="gray">
              Create a new one or click below to generate samples.
            </Typography>
          </Box>
          <Box sx={{paddingTop: 2}}>
            <Button onClick={() => runSeed()} variant='contained'>Sample rodeos</Button>
          </Box>
        </Box>
      ) : (
        <TabPanel tabNames={['Upcoming', 'Past', 'All']}>
          <RodeosGrid rodeos={futureRodeos}/>
          <RodeosGrid rodeos={pastRodeos?.reverse()}/>
          <RodeosGrid rodeos={rodeos}/>
        </TabPanel>
      )}
      <LoadingBackdrop isOpen={isLoading}/>
    </RodeoDashboardLayout>
  );
};

RodeoDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  )
};

export default RodeoDashboard;
