import React from 'react';
import {Link} from 'react-router-dom';

function PostCard({_id, title, fileUrl, comments, views}) {
  return (
    <Link to={`/posts/${_id}`}>
      <span>title : {title}</span>
      <span>fileUrl : <img src={fileUrl} alt=""/></span>
      <span>comments : {comments}</span>
      <span>views : {views}</span>
    </Link>
  );
}

export default PostCard;