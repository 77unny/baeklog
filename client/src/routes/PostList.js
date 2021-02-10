import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {POSTS_LOADING_REQUEST} from '../redux/types';
import {List, Space, Spin} from 'antd';
import {MessageOutlined} from '@ant-design/icons';
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
      {posts ?
        <List
          itemLayout="vertical"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={posts}
          renderItem={post => {
            return <List.Item
              key={post._id}
              actions={[<Space><MessageOutlined/>{post.comments.length}</Space>]}
              extra={
                <img
                  width={272}
                  alt={post.title}
                  src={post.fileUrl}
                />
              }>
              <List.Item.Meta
                title={<Link to={`/posts/${post._di}`}>{post.title}</Link>}
                description={post.description}
              />
              {post.content}
            </List.Item>;
          }}/>
        : <Spin/>
      }
    </>
  );
}

export default PostList;