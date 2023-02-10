import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../types/settings';
import { Status, Statuses } from '../../types/status';

export interface ISettingsSlice {
  status: Status;
  settings: Settings;
}

const initialState: ISettingsSlice = {
  status: Statuses.Initial,
  settings: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      return {
        status: Statuses.Complete,
        settings: action.payload,
      };
    },
    startFetch: (state) => {
      return {
        settings: [],
        status: Statuses.Loading,
      };
    },
    failedSettings: (state) => {
      return {
        ...state,
        status: Statuses.Failed,
      };
    },
    fetchSettings: (state) => {},
  },
});

export const { actions: settingsActions, reducer: settingsReducer } =
  settingsSlice;
