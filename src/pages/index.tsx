// route: / (home)

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
// import prisma from 'src/prisma';
import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// export const async getServerSideProps = () => {
//   const rodeos = await prisma.rodeo.findMany();

//   return {
//     props: {

//     }
//   }
// }

const Home = () => {


  return (
    <div>
      
    </div>
  );
};

export default Home;

