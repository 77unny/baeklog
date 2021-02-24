import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {} from 'react-helmet';
import {POST_DELETE_REQUEST, POST_DETAIL_REQUEST, USER_LOADING_REQUEST} from '../redux/types';
import CKEditor from '@ckeditor/ckeditor5-react';
import {Button, Col, Row} from 'antd';
import {Link} from 'react-router-dom';

function PostDetail({match}) {
  const dispatch = useDispatch();
  const {postDetail, createId, title, loading} = useSelector(state => state.posts);
  const {userId, userName} = useSelector(state => state.auth);


  const onDeleteClick = () => {
    dispatch({
      type   : POST_DELETE_REQUEST,
      payload: {
        id   : match.params.id,
        token: localStorage.getItem('token')
      }
    });
  };

  const EditButton = (
    <>
      <Row>
        <Col>
          <Link to={'/'}>Home</Link>
        </Col>
        <Col>
          <Link to={`/post/${match.params.id}/edit`}>Edit</Link>
        </Col>
        <Col>
          <Button onClick={onDeleteClick}>Delete</Button>
        </Col>
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row>
        <Col>
          <Link to={'/'}>Home</Link>
        </Col>
      </Row>
    </>
  );

  useEffect(() => {
    dispatch({
      type   : POST_DETAIL_REQUEST,
      payload: match.params.id
    });
    dispatch({
      type   : USER_LOADING_REQUEST,
      payload: localStorage.getItem('token')
    });
  }, [dispatch, match]);
  console.log(title)
  return (
    <>
      <div>PostDetail</div>
    </>
  );
}

export default PostDetail;