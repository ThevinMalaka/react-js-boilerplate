import * as types from './actionTypes';

export function testAction(info) {
  console.log('info', info);
  return {
    type: types.TEST_ACTION,
    info,
  };
}

export function testActionSuccess(info) {
  return {
    type: types.TEST_ACTION_SUCCESS,
    info,
  };
}

export function testActionFailed(info) {
  return {
    type: types.TEST_ACTION_FAILED,
    info,
  };
}
