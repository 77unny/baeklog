import axios from 'axios';
import {all, fork,call, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../types';

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

function* watchingLoginUser(){
  yield takeEvery(LOGIN_REQUEST, loginUser)
}

export default function* authSaga(){
  yield all([
    fork(watchingLoginUser)
  ])
}