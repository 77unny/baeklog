import axios from 'axios';
import {all, fork, call, put, takeEvery} from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS
} from '../types';

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

const fetchUserLoading = token => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) config.headers['x-auth-token'] = token;
  return axios('api/auth/user', config);
};

function* userLoading(action) {
  try {
    console.log('[userLoading]', action);
    const result = yield call(fetchUserLoading, action.payload);
    yield put({
      type   : USER_LOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type   : USER_LOADING_FAILURE,
      payload: e.response
    });
  }
}

function* watchingUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchingLoginUser),
    fork(watchingLogoutUser),
    fork(watchingUserLoading),
  ]);
}