import axios from 'axios';
import {all, fork, call, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS} from '../types';

const fetchUser = loginData => {
  console.log('[login data]', loginData);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(fetchUser, action.payload);
    console.log('[loginUser]', result);
    yield put({
      type   : LOGIN_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type   : LOGIN_FAILURE,
      payload: e.response
    });
  }
}

function* watchingLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* logoutUser() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchingLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

export default function* authSaga() {
  yield all([
    fork(watchingLoginUser),
    fork(watchingLogoutUser)
  ]);
}