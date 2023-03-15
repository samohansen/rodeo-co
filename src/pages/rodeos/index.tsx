import { PrismaClient } from '@prisma/client'
import { useState } from "react";
import { formatDate } from "@common/utils";
import Grid from "@mui/material/Grid";
import RodeoCard from '@features/RodeoDashboard/RodeoCard';
import { useRouter } from 'next/router';
import OpenModalButton from '@common/navigation/OpenModalButton';
import CreateRodeoFormModal from '@features/RodeoDashboard/CreateRodeoFormModal';
import RodeoContext from '@features/RodeoDashboard/RodeoContext'
import type { nRodeo } from '@common/types';
import type { NextPageWithLayout } from '@common/types';
import LeftNavLayout from '@common/layouts/LeftNavLayout'
import type { ReactElement } from 'react';

type Props = {
  initialRodeos: nRodeo[];
}

const prisma = new PrismaClient()
export async function getServerSideProps () {
  const rodeos = await prisma.rodeo.findMany();

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

  return (<>
    <RodeoContext.Provider value={{rodeos, setRodeos}}>
      <h1>Rodeos</h1>
      <Grid container spacing={3}>
        {rodeos?.map(rodeo => (
          <Grid item xs={12} sm={6} md={4} key={rodeo.id}>
            <RodeoCard 
              rodeo={rodeo}
              onClick={() => router.push(`/rodeos/${encodeURIComponent(rodeo.id)}`)}
            />
          </Grid>
        ))}
      </Grid>
      <OpenModalButton 
        buttonText='Add new rodeo'
      >
        <CreateRodeoFormModal/>
      </OpenModalButton>
    </RodeoContext.Provider>
  </>);
};

RodeoDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default RodeoDashboard;
