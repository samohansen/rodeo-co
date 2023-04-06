import type { LeftNavMenuItem } from '@common/types';
import React, {useState, useEffect} from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Today from '@mui/icons-material/Today';
import { useRouter, usePathname } from 'next/navigation';

const LEFT_NAV_WIDTH = 200;
const ADMIN_MENU_ITEMS: LeftNavMenuItem[] = [{
  label: 'Home',
  path: '/',
  icon: <HomeIcon/>
}, {
  label: 'Rodeos',
  path: '/rodeos',
  icon: <Today />
}, {
  label: 'Participants',
  path: '/participants',
  icon: <PeopleIcon />
}];

const PARTICIPANT_MENU_ITEMS: LeftNavMenuItem[] = [{
  label: 'Home',
  path: '/',
  icon: <HomeIcon/>
}, {
  label: 'Rodeos',
  path: '/rodeos',
  icon: <Today />
}, {
  label: 'My events',
  path: '/entries',
  icon: <EmojiEvents />
}];

type Props = {
  userType: 'admin' | 'participant' | 'new';
}

const LeftNav: React.FC<Props> = ({userType}) => {
  const menuItems = userType === 'admin' ? ADMIN_MENU_ITEMS : PARTICIPANT_MENU_ITEMS
  const router = useRouter();
  const activePath = usePathname();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    menuItems?.forEach(({path, label}) => {
      if (activePath.startsWith(path)) {
        if (activePath === '/') {
          setSelected('Home')
        } else {
          setSelected(label)
        }
      }
    })
  }, [activePath])

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
          bgcolor: '#CCCCC1',
        },
      }}
    >
      <Toolbar />
      <List sx={{padding: 0}}>
        {menuItems?.map(({label, path, icon}) => (
          <ListItem key={label} disablePadding>
            <ListItemButton 
              selected={selected === label}
              onClick={() => router.push(path)}
            >
              <ListItemIcon sx={{minWidth: '40px'}}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}

export default LeftNav;
