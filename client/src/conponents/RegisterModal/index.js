import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CLEAR_ERROR_REQUEST, REGISTER_REQUEST} from '../../redux/types';
import {Alert, Button, Form, Input, Modal} from 'antd';

function RegisterModal(props) {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [form] = Form.useForm();
  const {errorMsg, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleCancel = () => {
    form.resetFields();
    setModal(false);
  };
  const onSubmit = () => {
    form.validateFields().then(values => {
      form.resetFields();
      console.log(values);
      dispatch({
        type   : REGISTER_REQUEST,
        payload: values
      });
    }).catch(e => console.error(e));
  };

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    });
    setModal(!modal);
  };

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.error(e);
    }
  }, [errorMsg]);

  return (
    <div>
      <Button onClick={handleToggle}>Register</Button>
      <Modal visible={modal}
             closable={false}
             footer={[
               <Button key="back" onClick={handleCancel} children={'취소'}/>,
               <Button key="submit" type="primary" loading={isLoading} onClick={onSubmit} children={'회원가입'}/>,
             ]}
      >
        {localMsg && <Alert message={localMsg} type="warning" showIcon/>}
        <Form form={form}>
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message : 'name을 입력해주세요.',
              },
            ]}
          >
            <Input name="name"/>
          </Form.Item>
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

export default RegisterModal;