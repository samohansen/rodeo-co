import type { ReactElement } from 'react';
import type { nRodeo, NextPageWithLayout } from '@common/types';
import { PrismaClient } from '@prisma/client'
import { useMemo } from "react";
import { partitionRodeos } from "@common/utils";
import OpenModalButton from '@common/navigation/OpenModalButton';
import LeftNavLayout from '@common/layouts/LeftNavLayout'
import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'
import CreateRodeoFormInterface from '@features/RodeoDashboard/RodeoForms/CreateRodeoFormInterface';
import RodeosGrid from '@features/RodeoDashboard/RodeosGrid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@api/auth/[...nextauth]';

type Props = {
  rodeos: nRodeo[];
}

const prisma = new PrismaClient()
export async function getServerSideProps (context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const rodeos = await prisma.rodeo.findMany({
    orderBy: { date: 'asc' },
    where: { adminId: session.user.id }
  });

  return {
    props: {
      rodeos: JSON.parse(JSON.stringify(rodeos))
    }
  }
}

const RodeoDashboard: NextPageWithLayout<Props> = ({rodeos = []}) => {
  const [pastRodeos, futureRodeos] = useMemo(
    () => partitionRodeos(rodeos), 
    [rodeos]
  );

  return (
    <RodeoDashboardLayout
      pageTitle='Rodeos'
      rightHeaderComponent={
        <OpenModalButton buttonText='Add new rodeo'>
          <CreateRodeoFormInterface/>
        </OpenModalButton>
      }
    >
      <TabPanel tabNames={['Upcoming', 'Past', 'All']}>
        <RodeosGrid rodeos={futureRodeos}/>
        <RodeosGrid rodeos={pastRodeos?.reverse()}/>
        <RodeosGrid rodeos={rodeos}/>
      </TabPanel>
    </RodeoDashboardLayout>
  );
};

RodeoDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default RodeoDashboard;
