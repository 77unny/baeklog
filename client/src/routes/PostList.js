import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {POSTS_LOADING_REQUEST} from '../redux/types';
import {Spin} from 'antd';
import Posts from '../conponents/Posts';

function PostList(props) {
  const {posts} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: POSTS_LOADING_REQUEST});
  }, [dispatch]);

  return (
    <>
      <Helmet title="POSTS"/>
      {posts ? <Posts posts={posts}/> : <Spin/>
      }
    </>
  );
}

export default PostList;