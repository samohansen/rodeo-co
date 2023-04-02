import * as React from 'react';
import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type Props = {
  tabNames: string[];
  disabled?: boolean;
  children: ReactNode[];
}

// This component requires prop: tabNames as an array of tab names
// It also requires child components to be **in the same order** as the tabName list

//(the below is deprecated but I want to leave it in case I change it back to using proper keys)
// have a key that matches the index of the corresponding tabName (the child components become the "children" prop)
//   *Only one child component per key. If you want multiple components on a tab, 
//   *they need to be wrapped and the wrapper given the key
const TabPanel: React.FC<Props> = ({tabNames, disabled, children}) => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: 3, paddingBottom: 0}} >
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {tabNames.map((tabName) => <Tab label={tabName} key={tabName} disabled={disabled}/> )}
        </Tabs>
      </Box>
      <Box sx={{ padding: 3 }}>
        {children.map((child, i) => (
          // tabIndex.toString() === child.key && (child)
          tabIndex === i && (child)
        ))}
      </Box>
    </Box>
  );
};

export default TabPanel;