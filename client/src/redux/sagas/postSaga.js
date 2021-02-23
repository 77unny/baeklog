import axios from 'axios';
import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_UPLOAD_FAILURE,
  POSTS_UPLOAD_REQUEST,
  POSTS_UPLOAD_SUCCESS
} from '../types';

const loadPostAPI = () => {
  return axios('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log('[loadPostsAPI]', result);

    yield put({
      type   : POSTS_LOADING_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type   : POSTS_LOADING_FAILURE,
      payload: e
    });
    yield push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const token = payload.token
  if (token) config.headers['x-auth-token'] = token;
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  try {
    console.log('[uploadPostsAPI action]', action)
    const result = yield call(uploadPostAPI, action.payload);
    console.log('[uploadPostsAPI]', result);

    yield put({
      type   : POSTS_UPLOAD_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result.data._id}`))
  } catch (e) {
    yield put({
      type   : POSTS_UPLOAD_FAILURE,
      payload: e
    });
    yield push('/');
  }
}

function* watchUploadPosts() {
  yield takeEvery(POSTS_UPLOAD_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchUploadPosts)]);
}