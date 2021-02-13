import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import {editorConfiguration} from './EditorConfig';
import MyCustomInit from './UploadAdapter';
import {Container} from '../Footer/Footer.style';
import {Button, Form, Input} from 'antd';


const Editor = () => {
  const onFinish = (value) => console.log(value);
  const onFinishFailed = (err) => console.log(err);

  return (
    <Container>
      <Form
        name="editor"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{required: true, message: '제목을 입력해주세요.'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="category"
          name="category"
          rules={[{required: true, message: '카테고리를 입력해주세요.'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="contents"
          name="contents"
          getValueFromEvent={(event, editor) => {
            const data = editor.getData();
            return data;
          }}
          rules={[{required: true, message: '내용을 입력해주세요.'}]}
        >
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            onReady={MyCustomInit}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({event, editor, data});
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Editor;