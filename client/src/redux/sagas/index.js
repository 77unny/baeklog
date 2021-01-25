import axios from 'axios';
import {all, fork} from 'redux-saga/effects';
import dotenv from 'dotenv';
import authSaga from './authSaga';

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}