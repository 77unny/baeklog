import React, {useState} from 'react';
import dotenv from 'dotenv';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import {editorConfiguration} from './EditorConfig';
import MyCustomInit from './UploadAdapter';
import {Container} from '../Footer/Footer.style';
import {Button, Form, Input} from 'antd';

dotenv.config();

const Editor = () => {
  const [thumbnail, setThumbnail] = useState(null);
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
            onBlur={(event, editor) => {
              const data = editor.getData();

              if (data && data.match('<img src=')) {
                console.log('[data]', data);
                const extensionType = ['jpg', 'jpeg', 'png', 'gif'];
                const imageStartPoint = data.indexOf('<img src=');
                let imageEndPoint;
                let findExtensionName;
                let resultImageUrl;

                extensionType.forEach((item, i) => {
                  if (data.match(item)) {
                    console.log('indexOfData', data.indexOf(item));
                    findExtensionName = item;
                    imageEndPoint = data.indexOf(item);
                  }
                });

                if (findExtensionName === 'jpeg') {
                  resultImageUrl = data.substring(imageStartPoint + 10, imageEndPoint + 4);
                } else {
                  resultImageUrl = data.substring(imageStartPoint + 10, imageEndPoint + 3);
                }

                setThumbnail(resultImageUrl);

              } else {
                setThumbnail(process.env.REACT_APP_DEFAULT_THUMBNAIL);
              }

            }}

            // onFocus={(event, editor) => {
            //   console.log('Focus.', editor);
            // }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Editor;