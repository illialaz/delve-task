import { put, takeEvery, Effect, ForkEffect, call } from 'redux-saga/effects';
import { settingsActions } from './slice';
import { getSettings } from '../../api/settingsAPI';
import { Settings } from '../../types/settings';

export function* fetchSettingsAsync(): Generator<Effect, void, Settings> {
  try {
    yield put(settingsActions.startFetch());
    const result = yield call(getSettings);
    yield put(settingsActions.setSettings(result));
  } catch (e) {
    yield put(settingsActions.failedSettings());
  }
}

export function* watchsettingsSagas(): Generator<ForkEffect, void> {
  yield takeEvery(settingsActions.fetchSettings, fetchSettingsAsync);
}

const settingsSagas = watchsettingsSagas;

export default settingsSagas;
