import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { setModalOpen } from '../../redux/user/userSlice';
import CreateMatchModal from './components/CreateMatchModal';
import MatchesSection from './components/MatchesSection';
import TableSection from './components/TableSection';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MatchesScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState(0);

  const createMatchModal = useAppSelector(state => state.user.modalOpen.createMatch);

  // Handlers
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleCloseCreateMatchModal = () => {
    dispatch(setModalOpen({ modal: 'createMatch', value: false }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Матчи" {...a11yProps(0)} />
            <Tab label="Таблица" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <MatchesSection />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TableSection />
        </TabPanel>
      </Box>

      <CreateMatchModal open={createMatchModal} handleClose={handleCloseCreateMatchModal} />
    </Container>
  );
};

export default MatchesScreen;
