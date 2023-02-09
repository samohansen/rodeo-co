import type { NextPage } from "next";
import Head from "next/head";
import LeftNav from "@common/navigation/LeftNav";
import MainToolbar from "@common/navigation/MainToolbar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import RodeoDashboard from "@features/RodeoDashboard/RodeoDashboard";
import { PrismaClient } from '@prisma/client'
import { formatDate } from "@common/utils";

const prisma = new PrismaClient()
export async function getServerSideProps () {
  const rodeos = await prisma.rodeo.findMany({
    include: {
      events: true,
    }
  });

  return {
    props: {
      rodeos: JSON.parse(JSON.stringify(rodeos))
      // rodeos: rodeos.map(rodeo => ({
      //   ...rodeo,
      //   date: formatDate(rodeo.date)
      // })),
    }
  }
}

const RodeoIndex = ({rodeos = []}) => {
  console.log(rodeos)

  return (
    <div>
      <RodeoDashboard
        rodeos={rodeos}
      />
    </div>
  );
};

export default RodeoIndex;