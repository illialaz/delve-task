import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import settingsSagas from './settings/saga';
import usersSagas from './users/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(settingsSagas), fork(usersSagas)]);
}
