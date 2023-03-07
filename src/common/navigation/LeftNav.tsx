import * as React from 'react';
import type { LeftNavMenuItem } from '@common/Types';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import logo from '@../../public/logo.png';

type Props = {
  width: number;
  menuItems?: LeftNavMenuItem | LeftNavMenuItem[]
}

const LeftNav = ({width, menuItems}) => {
  const router = useRouter();
  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      >

      {/* cant figure out how to link this logo image (found in public folder) */}
      <img src={logo.src} alt="logo"/>

      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((menuItem) => (
          <ListItem key={menuItem.label} disablePadding>
              <ListItemButton href={menuItem.path}>
              {/* <ListItemButton onClick={() => router.push(menuItem.path)}> */}
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default LeftNav;