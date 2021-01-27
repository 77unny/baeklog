import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_ERROR_REQUEST, LOGIN_REQUEST, REGISTER_REQUEST} from '../../redux/types';
import {Alert, Button, Form, Modal, Input} from 'antd';

function LoginModal(props) {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [form] = Form.useForm();
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
    form.resetFields();
    setModal(false);
  };

  const onSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      dispatch({
        type   : LOGIN_REQUEST,
        payload: values
      });
    }).catch(e => console.error(e));
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
        {localMsg && <Alert message={localMsg} type="warning" showIcon/>}
        <Form form={form}>
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message : 'email을 입력해주세요.',
              },
            ]}
          >
            <Input name="email"/>
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message : 'password를 입력해주세요.',
              },
            ]}
          >
            <Input.Password name="password"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LoginModal;