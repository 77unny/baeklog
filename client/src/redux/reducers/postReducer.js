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

const initialState = {
  isAuthenticated   : null,
  posts             : [],
  postDetail        : '',
  postCount         : '',
  loading           : false,
  error             : '',
  createId          : '',
  categoryFindResult: '',
  title             : '',
  searchBy          : '',
  searchResult      : ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST :
      return {
        ...state,
        posts  : [],
        loading: true,
      };
    case POSTS_LOADING_SUCCESS :
      return {
        ...state,
        posts  : [...state.posts, ...action.payload],
        loading: false,
      };
    case POSTS_LOADING_FAILURE :
      return {
        ...state,
        loading: false,
      };
    case POST_DETAIL_REQUEST :
      return {
        ...state,
        posts  : [],
        loading: true,
      };
    case POST_DETAIL_SUCCESS :
      return {
        ...state,
        postDetail: action.payload,
        createId  : action.payload.creator._id,
        title     : action.payload.title,
        loading   : false,
      };
    case POST_DETAIL_FAILURE :
      return {
        ...state,
        error  : action.payload,
        loading: false,
      };
    case POSTS_UPLOAD_REQUEST :
      return {
        ...state,
        loading: true,
      };
    case POSTS_UPLOAD_SUCCESS :
      return {
        ...state,
        posts          : action.payload,
        isAuthenticated: true,
        loading        : false,
      };
    case POSTS_UPLOAD_FAILURE :
      return {
        ...state,
        error  : action.payload,
        loading: false,
      };
    default :
      return state;
  }
}