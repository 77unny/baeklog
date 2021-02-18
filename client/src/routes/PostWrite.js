import React from 'react';
import PostEditor from '../conponents/PostEditor';
import {useSelector} from 'react-redux';

function PostWrite(props) {
  const {isAuthenticated} = useSelector(state => state.auth);
  return (
    <div>
      {isAuthenticated && <PostEditor/>}
    </div>
  );
}

export default PostWrite;