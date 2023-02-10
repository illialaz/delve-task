import { Operations, QueryType } from '../components/Settings/types';
import { UsersPayload } from '../redux/users/slice';
import { Users } from '../types/users';
import http from './axios';

const adaptQuery = (query: QueryType): string => {
  const { operation, value } = query;

  if (operation === Operations.All) {
    return '*';
  }

  if (operation === Operations.Value) {
    return value;
  }

  return `${operation}(${value})`;
};

export const getUsers = async ({
  queries,
  groupBy,
}: UsersPayload): Promise<Users> => {
  const adaptedQueries = queries.map((query) => adaptQuery(query));

  return await new Promise((resolve, reject) => {
    http
      .post<Users>(
        '/',
        { queries: adaptedQueries, groupBy },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      .then((res) => resolve(res.data))
      .catch((e) => reject(e));
  });
};
