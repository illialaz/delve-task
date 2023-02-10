import { put, takeEvery, Effect, ForkEffect, call } from 'redux-saga/effects';
import { usersActions, UsersPayload } from './slice';
import { getUsers } from '../../api/usersAPI';
import { Users } from '../../types/users';

export function* fetchUsersAsync({
  payload,
}: {
  payload: UsersPayload;
}): Generator<Effect, void, Users> {
  try {
    yield put(usersActions.setUserValuesNames(payload.queries));
    yield put(usersActions.startFetch());
    const result = yield call(getUsers, payload);
    yield put(usersActions.setUsers(result));
  } catch (e) {
    yield put(usersActions.failedUsers());
  }
}

export function* watchSettingsSagas(): Generator<ForkEffect, void> {
  yield takeEvery(usersActions.fetchUsers, fetchUsersAsync);
}

const settingsSagas = watchSettingsSagas;

export default settingsSagas;
