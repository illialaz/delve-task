import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { SettingType } from '../../types/settings';
import { Operations, Operation, QueryType } from './types';

const mapOperationToType: Record<Operation, SettingType[]> = {
  [Operations.All]: [
    SettingType.FLOAT,
    SettingType.INT,
    SettingType.STRING,
    SettingType.TIME,
  ],
  [Operations.Value]: [
    SettingType.FLOAT,
    SettingType.INT,
    SettingType.STRING,
    SettingType.TIME,
  ],
  [Operations.COUNT]: [
    SettingType.FLOAT,
    SettingType.INT,
    SettingType.STRING,
    SettingType.TIME,
  ],
  [Operations.AVG]: [SettingType.FLOAT, SettingType.INT],
  [Operations.MAX]: [
    SettingType.FLOAT,
    SettingType.INT,
    SettingType.STRING,
    SettingType.TIME,
  ],
  [Operations.MIN]: [
    SettingType.FLOAT,
    SettingType.INT,
    SettingType.STRING,
    SettingType.TIME,
  ],
};

interface QueryProps {
  addQuery: (query: QueryType) => void;
  isFirst: boolean;
}

const Query: FC<QueryProps> = ({ addQuery, isFirst }) => {
  const { settings } = useAppSelector((state) => state.settings);
  const [operation, setOperation] = useState<Operation>();
  const [value, setValue] = useState<string>();

  const allowedOperations = Object.values(Operations).filter((oper) => {
    if (!isFirst) {
      return true;
    }
    return oper !== Operations.All;
  });

  const handleOperationChange = (event: SelectChangeEvent): void => {
    event.target.value !== '' && setOperation(event.target.value as Operation);
  };

  const handleValueChange = (event: SelectChangeEvent): void => {
    event.target.value !== '' && setValue(event.target.value);
  };

  useEffect(() => {
    if (operation !== undefined && value !== undefined) {
      addQuery({ operation, value });
      setOperation(undefined);
      setValue(undefined);
    }
    if (operation === Operations.All) {
      addQuery({ operation, value: '' });
      setOperation(undefined);
      setValue(undefined);
    }
  }, [operation, value]);

  return (
    <Box>
      <Select
        value={operation ?? ''}
        onChange={handleOperationChange}
        autoWidth
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allowedOperations.map((oper, index) => (
          <MenuItem key={`${oper}${index}`} value={oper}>
            {oper}
          </MenuItem>
        ))}
      </Select>
      {operation !== undefined && operation !== Operations.All && (
        <Select value={value ?? ''} onChange={handleValueChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {operation === Operations.COUNT && (
            <MenuItem value="*">{Operations.All}</MenuItem>
          )}
          {settings
            .filter(({ type }) => mapOperationToType[operation].includes(type))
            .map(({ name }, index) => (
              <MenuItem key={`${name}${index}`} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
      )}
    </Box>
  );
};

export default Query;
