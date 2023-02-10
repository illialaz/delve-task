import { settingsReducer } from './settings/slice';
import { usersReducer } from './users/slice';

const rootReducer = {
  settings: settingsReducer,
  users: usersReducer,
};

export default rootReducer;
