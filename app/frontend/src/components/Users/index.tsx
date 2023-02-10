import { Box } from '@mui/material';
import React, { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Statuses } from '../../types/status';

const Users: FC = () => {
  const { users: usersState } = useAppSelector((state) => state);
  const { users, userValuesNames, status } = usersState;

  const usersTable = [userValuesNames, ...users];

  return (
    <Box
      sx={{
        width: '70vw',
        overflow: 'scroll',
        borderLeft: '1px solid black',
        transform: 'rotateX(180deg)',
      }}
    >
      {status !== Statuses.Complete && (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ transform: 'rotateX(180deg)' }}
        >
          {status === Statuses.Initial && 'Run the query'}
          {status === Statuses.Loading && 'Running the query...'}
          {status === Statuses.Failed &&
            'Something wrong with your query. Try another.'}
        </Box>
      )}
      {status === Statuses.Complete && (
        <Box
          sx={{
            width: 'fit-content',
            display: 'grid',
            gridTemplateColumns: `repeat(${userValuesNames.length}, auto)`,
            backgroundColor: 'black',
            gridGap: '1px',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            borderTop: '1px solid black',
            transform: 'rotateX(180deg)',
          }}
        >
          {usersTable.map((userRow, index) => {
            return userRow.map((userValue, index) => (
              <Box
                sx={{
                  whiteSpace: 'nowrap',
                  backgroundColor: 'white',
                  p: '7px',
                }}
                key={`${userValue}${index}`}
              >
                {userValue}
              </Box>
            ));
          })}
        </Box>
      )}
    </Box>
  );
};

export default Users;
