import axios from 'axios';
import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {
  POST_DETAIL_FAILURE,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
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
  const token = payload.token;
  if (token) config.headers['x-auth-token'] = token;
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    yield put({
      type   : POSTS_UPLOAD_SUCCESS,
      payload: result.data
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type   : POSTS_UPLOAD_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchUploadPosts() {
  yield takeEvery(POSTS_UPLOAD_REQUEST, uploadPosts);
}

const postDetailAPI = (id) => {
  return axios(`/api/post/${id}`);
};

function* postDetail(action) {
  try {
    const result = yield call(postDetailAPI, action.payload);
    console.log('[postDetailAPI 2]', result);

    yield put({
      type   : POST_DETAIL_SUCCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type   : POST_DETAIL_FAILURE,
      payload: e
    });
    yield put(push('/'));
  }
}

function* watchPostDetail() {
  yield takeEvery(POST_DETAIL_REQUEST, postDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchPostDetail)
  ]);
}