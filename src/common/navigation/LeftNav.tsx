import * as React from 'react';
import type { LeftNavMenuItem } from '@common/types';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LEFT_NAV_WIDTH = 220;
const ADMIN_MENU_ITEMS: LeftNavMenuItem[] = [{
  label: 'Home',
  path: '/',
  icon: <HomeIcon/>
}, {
  label: 'Rodeos',
  path: '/rodeos',
  icon: <EventAvailableIcon />
}, {
  label: 'Participants - Coming Soon!',
  path: '/participants',
  icon: <PeopleIcon />
}];
const PARTICIPANT_MENU_ITEMS: LeftNavMenuItem[] = [{
  label: 'Home',
  path: '/',
  icon: <HomeIcon/>
}, {
  label: 'My events',
  path: '/rodeos',
  icon: <EventAvailableIcon />
}, {
  label: 'Account',
  path: '/participants',
  icon: <AccountCircleIcon />
}];

const LeftNav: React.FC = () => {
  const menuItems = ADMIN_MENU_ITEMS;
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: LEFT_NAV_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: LEFT_NAV_WIDTH,
          boxSizing: 'border-box',
          color: 'black',
          bgcolor: '#B9CFED' // #CCCCC1
        },
      }}
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
