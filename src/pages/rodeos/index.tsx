import type { ReactElement } from 'react';
import type { nRodeo, NextPageWithLayout } from '@common/types';
import { PrismaClient } from '@prisma/client'
import { useContext, useState } from "react";
import { useRouter } from 'next/router';
import { formatDate } from "@common/utils";
import Grid from "@mui/material/Grid";
import RodeoCard from '@features/RodeoDashboard/RodeoCard';
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateRodeoFormModal from '@features/RodeoDashboard/CreateRodeoFormModal';
import RodeosContext from '@features/RodeoDashboard/RodeosContext'
import LeftNavLayout from '@common/layouts/LeftNavLayout'
import TabPanel from '@common/dataDisplay/TabPanel';
import RodeoDashboardLayout from '@features/RodeoDashboard/RodeoDashboardLayout'

type Props = {
  initialRodeos: nRodeo[];
}

const prisma = new PrismaClient()
export async function getServerSideProps () {
  const rodeos = await prisma.rodeo.findMany({
    orderBy: { date: 'asc' }
  });

  return {
    props: {
      initialRodeos: rodeos.map(rodeo => ({
        ...rodeo,
        date: formatDate(rodeo.date)
      })),
    }
  }
}

const RodeoDashboard: NextPageWithLayout<Props> = ({initialRodeos = []}) => {
  const router = useRouter();
  const [rodeos, setRodeos] = useState(initialRodeos);

  let pastRodeos = [];
  let futureRodeos = [];
  const today = new Date;
  rodeos.forEach(rodeo => {
    if (new Date(rodeo.date) < today) pastRodeos.push(rodeo)
    else if (new Date(rodeo.date) > today) futureRodeos.push(rodeo)
  })

  return (
    <RodeosContext.Provider value={{rodeos, setRodeos}}>
      <RodeoDashboardLayout
        pageTitle='Rodeos'
        rightHeaderComponent={
          <OpenModalButton 
            buttonText='Add new rodeo'
          >
            <CreateRodeoFormModal/>
          </OpenModalButton>
        }
      >
        <TabPanel tabNames={['Upcoming', 'Past']}>
          <Grid container spacing={3}>
            {futureRodeos?.map(rodeo => (
              <Grid item xs={12} sm={6} md={4} key={rodeo.id}>
                <RodeoCard 
                  rodeo={rodeo}
                  onClick={() => router.push(`/rodeos/${encodeURIComponent(rodeo.id)}`)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={3}>
            {pastRodeos?.reverse().map(rodeo => (
              <Grid item xs={12} sm={6} md={4} key={rodeo.id}>
                <RodeoCard 
                  rodeo={rodeo}
                  onClick={() => router.push(`/rodeos/${encodeURIComponent(rodeo.id)}`)}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </RodeoDashboardLayout>
    </RodeosContext.Provider>
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
