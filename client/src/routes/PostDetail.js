import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Helmet} from 'react-helmet';
import {POST_DELETE_REQUEST, POST_DETAIL_REQUEST, USER_LOADING_REQUEST} from '../redux/types';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import {Button, Col, Row} from 'antd';
import {Link} from 'react-router-dom';
import {editorConfiguration} from '../components/PostEditor/EditorConfig';

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


  return (
    <>
      <Helmet title={`POST || ${title}`}/>
      {userId === createId ? EditButton : HomeButton}
      <div>
        <p>title : {title}</p>
        <p>user : {userName}</p>
        <CKEditor
          editor={BalloonEditor}
          data={postDetail.contents}
          config={editorConfiguration}
          disabled
        />
      </div>
    </>
  );
}

export default PostDetail;