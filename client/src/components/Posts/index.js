import React from 'react';
import {Link} from 'react-router-dom';
import {List, Space} from 'antd';
import {MessageOutlined} from '@ant-design/icons';

function Posts({posts}) {
  return (
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
            title={<Link to={`/post/${post._id}`}>{post.title}</Link>}
            description={post.description}
          />
          {post.content}
        </List.Item>;
      }}/>
  );
}

export default Posts;