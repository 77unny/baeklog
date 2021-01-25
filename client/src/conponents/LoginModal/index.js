import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_ERROR_REQUEST, LOGIN_REQUEST} from '../../redux/types';
import {Alert, Button, Form, Modal, Input} from 'antd';

function LoginModal(props) {
  const [modal, setModal] = useState(false);
  const [localMag, setLocalMsg] = useState('');
  const [form, setValues] = useState({
    email   : '',
    password: ''
  });
  const dispatch = useDispatch();
  const {errorMsg, isLoading} = useSelector(state => state.auth);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    });
    setModal(!modal);
  };

  const handleCancel = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    });
    setModal(false);
  };

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const {email, password} = form;
    const user = {email, password};
    console.log('[onsubmit]', user);
    dispatch({
      type: LOGIN_REQUEST,
      payload: user
    });
  };

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  return (
    <div>
      <Button onClick={handleToggle}>Login</Button>
      <Modal visible={modal}
             closable={false}
             footer={[
               <Button key="back" onClick={handleCancel} children={'취소'}/>,
               <Button key="submit" type="primary" loading={isLoading} onClick={onSubmit} children={'로그인'}/>,
             ]}
      >
        {localMag && <Alert message={localMag}  type="warning" showIcon />}
        <Form>
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: 'email을 입력해주세요.',
              },
            ]}
          >
            <Input name="email" onChange={onChange}/>
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: 'password를 입력해주세요.',
              },
            ]}
          >
            <Input.Password name="password" onChange={onChange}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LoginModal;