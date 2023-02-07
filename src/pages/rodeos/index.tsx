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
import { PLACEHOLDER_RODEOS } from "src/content/mockData";

const IndexPage: NextPage = () => {
  return (
    <div>
      <RodeoDashboard
        rodeos={PLACEHOLDER_RODEOS}
      />
    </div>
  );
};

export default IndexPage;