import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

interface QueryProps {
  addGroupBy: (field: string) => void;
}

const GroupBy: FC<QueryProps> = ({ addGroupBy }) => {
  const { settings } = useAppSelector((state) => state.settings);
  const [value, setValue] = useState<string>();

  const handleValueChange = (event: SelectChangeEvent): void => {
    event.target.value !== '' && setValue(event.target.value);
  };

  useEffect(() => {
    if (value !== undefined) {
      addGroupBy(value);
      setValue(undefined);
    }
  }, [value]);

  return (
    <Box>
      <Select value={value ?? ''} onChange={handleValueChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {settings.map(({ name }, index) => (
          <MenuItem key={`${name}${index}`} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default GroupBy;
