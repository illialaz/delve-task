import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { settingsActions } from './redux/settings/slice';
import { Statuses } from './types/status';
import Settings from './components/Settings';
import Users from './components/Users';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.settings);

  useEffect(() => {
    if (status === Statuses.Initial) {
      dispatch(settingsActions.fetchSettings());
    }
  }, []);

  return (
    <Box>
      {status !== Statuses.Complete && (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {status === Statuses.Initial && 'Loading...'}
          {status === Statuses.Loading && 'Loading...'}
          {status === Statuses.Failed &&
            'Something went wrong. Refresh the page.'}
        </Box>
      )}
      {status === Statuses.Complete && (
        <Box sx={{ display: 'flex' }}>
          <Settings />
          <Users />
        </Box>
      )}
    </Box>
  );
}

export default App;
