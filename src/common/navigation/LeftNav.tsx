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
          color: 'black',
          bgcolor: '#B9CFED'
        },
      }}
      variant="permanent"
      anchor="left"
      >

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