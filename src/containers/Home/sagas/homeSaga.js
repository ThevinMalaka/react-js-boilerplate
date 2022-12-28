import { put, call } from 'redux-saga/effects';
import httpStatus from 'http-status';

import * as homeAction from '../actions';
import {home} from '../../../api/endpoints';

export function* testFunction(payload) {
  console.log('SAGA', payload);
  try {;
    const { info } = payload;
    const { data, status } = yield call(home);

    if (status !== httpStatus.OK) {
      throw new Error();
    }
    yield homeAction.testActionSuccess();
  } catch (error) {
    console.log('SAGA Failed');
    yield put(homeAction.testActionFailed());
  }
}
