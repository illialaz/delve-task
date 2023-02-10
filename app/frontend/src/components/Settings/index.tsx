import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Operations, QueryType } from './types';
import Query from './Query';
import GroupBy from './GroupBy';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { usersActions } from '../../redux/users/slice';
import { Settings as SettingsType } from '../../types/settings';

const adaptQueries = (
  queries: QueryType[],
  settings: SettingsType
): QueryType[] => {
  const isAdaptNeeded = queries.some(
    (query) => query.operation === Operations.All
  );

  if (isAdaptNeeded) {
    return settings.map((setting) => ({
      operation: Operations.Value,
      value: setting.name,
    }));
  }

  return queries;
};

const Settings: FC = () => {
  const [queries, setQueries] = useState<QueryType[]>([]);
  const [groupBy, setGroupBy] = useState<string[]>([]);

  const { settings } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const addQuery = useCallback(
    (query: QueryType) => setQueries((queries) => [...queries, query]),
    []
  );

  const addGroupBy = useCallback(
    (field: string) =>
      setGroupBy((fields) => [
        ...fields.filter((curField) => curField !== field),
        field,
      ]),
    []
  );

  const isNewQueryAllowed = queries.every(
    (query) => query.operation !== Operations.All
  );

  const isNewFilterAllowed =
    isNewQueryAllowed &&
    queries.some(
      (query) =>
        query.operation === Operations.AVG ||
        query.operation === Operations.MIN ||
        query.operation === Operations.MAX ||
        query.operation === Operations.COUNT
    );

  useEffect(() => {
    const isEmptyFilter =
      queries.length === 0 ||
      (queries.every((query) => query.operation !== Operations.All) &&
        !queries.some(
          (query) =>
            query.operation === Operations.AVG ||
            query.operation === Operations.MIN ||
            query.operation === Operations.MAX ||
            query.operation === Operations.COUNT
        ));

    if (isEmptyFilter && groupBy.length > 0) {
      setGroupBy([]);
    }
  }, [queries, groupBy]);

  useEffect(() => {
    const isAgregated = queries.some(
      (query) =>
        query.operation === Operations.AVG ||
        query.operation === Operations.MIN ||
        query.operation === Operations.MAX ||
        query.operation === Operations.COUNT
    );

    if (isAgregated) {
      const groupByFields = queries
        .filter((query) => query.operation === Operations.Value)
        .map(({ value }) => value);

      const neededGroupByFields: string[] = [];
      groupByFields.forEach((field) => {
        if (!groupBy.includes(field)) {
          neededGroupByFields.push(field);
        }
      });

      if (neededGroupByFields.length > 0) {
        setGroupBy([
          ...groupBy.filter((field) => !neededGroupByFields.includes(field)),
          ...neededGroupByFields,
        ]);
      }
    }
  }, [queries, groupBy]);

  return (
    <Box sx={{ width: '30vw', px: '20px', boxSizing: 'border-box' }}>
      <Box
        sx={{
          p: '20px',
          mb: '20px',
          borderRadius: '10px',
          backgroundColor: 'blue',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
        onClick={() =>
          queries.length > 0 &&
          dispatch(
            usersActions.fetchUsers({
              queries: adaptQueries(queries, settings),
              groupBy,
            })
          )
        }
      >
        <Box component="span" sx={{ color: 'white' }}>
          RUN QUERY
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: '20px', color: 'blue' }}>SELECT</Box>
        {queries.map(({ operation, value }, index) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '10px',
            }}
            key={`${value}${index}`}
          >
            <Box component="span" sx={{ width: '33%' }}>
              {operation}
            </Box>
            <Box component="span" sx={{ width: '33%' }}>
              {value}
            </Box>
            <Box
              component="span"
              sx={{ cursor: 'pointer', justifySelf: 'end', color: 'red' }}
              onClick={() =>
                setQueries(
                  queries.filter(
                    (query) =>
                      !(query.operation === operation && query.value === value)
                  )
                )
              }
            >
              Delete
            </Box>
          </Box>
        ))}
        {isNewQueryAllowed && (
          <Query isFirst={queries.length > 0} addQuery={addQuery} />
        )}
      </Box>
      {isNewFilterAllowed && queries.length > 0 && (
        <Box>
          <Box sx={{ my: '20px', color: 'blue' }}>GROUP BY</Box>
          {groupBy.map((value, index) => (
            <Box
              key={`${value}${index}`}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '10px',
              }}
            >
              <Box component="span">{value}</Box>
              <Box
                component="span"
                sx={{ cursor: 'pointer', color: 'red' }}
                onClick={() =>
                  setGroupBy(groupBy.filter((field) => field !== value))
                }
              >
                Delete
              </Box>
            </Box>
          ))}
          <GroupBy addGroupBy={addGroupBy} />
        </Box>
      )}
    </Box>
  );
};

export default Settings;
