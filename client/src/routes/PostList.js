import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {POSTS_LOADING_REQUEST} from '../redux/types';
import {Helmet} from 'react-helmet';
import {Spin} from 'antd';
import PostCard from '../conponents/PostCard';

function PostList(props) {
  const {posts} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: POSTS_LOADING_REQUEST});
  }, [dispatch]);

  return (
    <>
      <Helmet title="POSTS"/>
      {posts ? posts.map(item => <PostCard key={item._id} _id={item._id} title={item.title} fileUrl={item.fileUrl}
                                           comments={item.comments} views={item.views}/>) : <Spin/>}
    </>
  );
}

export default PostList;