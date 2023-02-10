import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operations, QueryType } from '../../components/Settings/types';
import { Status, Statuses } from '../../types/status';
import { Users } from '../../types/users';

export interface IUsersSlice {
  status: Status;
  users: Users;
  userValuesNames: string[];
}

const initialState: IUsersSlice = {
  status: Statuses.Initial,
  users: [],
  userValuesNames: [],
};

export interface UsersPayload {
  queries: QueryType[];
  groupBy: string[];
}

const adaptQueryToValueName = (query: QueryType): string => {
  if (query.operation === Operations.Value) {
    return query.value;
  }

  return `${query.operation}_${query.value}`;
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserValuesNames: (state, action: PayloadAction<QueryType[]>) => {
      return {
        ...state,
        userValuesNames: action.payload.map((query) =>
          adaptQueryToValueName(query)
        ),
      };
    },
    setUsers: (state, action: PayloadAction<Users>) => {
      return {
        ...state,
        status: Statuses.Complete,
        users: action.payload,
      };
    },
    startFetch: (state) => {
      return {
        ...state,
        users: [],
        status: Statuses.Loading,
      };
    },
    failedUsers: (state) => {
      return {
        ...state,
        status: Statuses.Failed,
      };
    },
    fetchUsers: (state, action: PayloadAction<UsersPayload>) => {},
  },
});

export const { actions: usersActions, reducer: usersReducer } = usersSlice;
