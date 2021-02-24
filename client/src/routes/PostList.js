import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {POSTS_LOADING_REQUEST} from '../redux/types';
import {Spin} from 'antd';
import Posts from '../components/Posts';

function PostList(props) {
  const {posts, loading} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: POSTS_LOADING_REQUEST});
  }, [dispatch]);

  return (
    <>
      <Helmet title="POSTS"/>
      {loading && <Spin/>}
      {posts && <Posts posts={posts}/>}
    </>
  );
}

export default PostList;