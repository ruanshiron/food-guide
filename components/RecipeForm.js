import { Form, Input, Button, Select, Upload, Spin, Row, Col } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { storage } from "../config/firebaseConfig"
import { useState } from "react";

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const RecipeForm = ({ onSubmitForm }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState()
  const [putImageRef, setPutImageRef] = useState()
  const [video, setVideo] = useState()
  const [putVideoRef, setPutVideoRef] = useState()
  const [loading, setLoading] = useState(false)

  const onGenderChange = (value) => {
    switch (value) {
      case "野菜":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "肉":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "チーズ":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const customUploadImage = async({ onError, onSuccess, file }) => {
    const storageRef = await storage.ref();
    const imgFile = storageRef.child(`recipes/${file.uid}.png`);
    try {
      onSuccess(null, imgFile);
      setPutImageRef(imgFile)
    } catch(e) {
      onError(e);
    }
  };

  const beforeUploadImage = (image) => {
    setImage(image)
  }


  const customUploadVideo = async({ onError, onSuccess, file }) => {
    const storageRef = await storage.ref();
    const videoFile = storageRef.child(`recipes/${file.uid}.mp4`);
    try {
      onSuccess(null, videoFile);
      setPutVideoRef(videoFile)
    } catch(e) {
      onError(e);
    }
  };

  const beforeUploadVideo = (video) => {
    setVideo(video)
  }

  const onFinish = async(values) => {
    const metadata1 = {
      contentType: 'image/jpeg'
    }
    const metadata2 = {
      contentType: 'video/mp4'
    }
    setLoading(true)
    await putImageRef.put(image, metadata1);
    await putVideoRef.put(video, metadata2);
    onSubmitForm(values);
    setLoading(false)
  }

  return (
    loading ? <div style={{ textAlign: 'center' }} className="container" ><Spin tip={'Uploading...'} indicator={antIcon}></Spin></div> :
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="title" label="料理名" rules={[{ required: true, message: 'Please input title' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="category" label="カテゴリ" rules={[{ required: true, message: 'Please input category' }]}>
          <Select
            placeholder="カテゴリを選択"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="野菜">野菜</Option>
            <Option value="肉">肉</Option>
            <Option value="チーズ">チーズ</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="説明"  rules={[{ required: true, message: 'Please input description' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="image"
          label="写真"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please input image' }]}
        >
          <Upload beforeUpload={beforeUploadImage} listType="picture" customRequest={customUploadImage} >
            <Button icon={<UploadOutlined />}>写真をアップロード</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="ビデオ">
          <Form.Item
            name="video"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true, message: 'Please input video' }]}
          >
            <Upload.Dragger beforeUpload={beforeUploadVideo} customRequest={customUploadVideo} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                クリックまたドロップしてアップロードする
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.List name="ingredients">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "材料" : ""}
                  key={field.key}
                >
                  <Row gutter={8}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                      name={[field.name, 'name']}
                      key={[field.name, 'name']}
                      rules={[{ required: true, message: 'Please input name' }]}
                    >
                      <Col>
                        <Input placeholder="マンゴ" />
                      </Col>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                      name={[field.name, 'quantity']}
                      key={[field.name, 'quantity']}
                      rules={[{ required: true, message: 'Please input quantity' }]}
                    >
                      <Col>
                        <Input placeholder="20gram" />
                      </Col>
                    </Form.Item>
                    <Col>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "70%" }}
                  icon={<PlusOutlined />}
                >
                  材料を追加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="steps">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "作り方" : ""}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                    rules={[{ required: true, message: 'Please input steps' }]}
                  >
                    <TextArea
                      placeholder="材料を入力"
                      style={{ width: "80%" }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "70%" }}
                  icon={<PlusOutlined />}
                >
                  作り方を追加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="point" label="ポイント" rules={[{ required: true, message: 'Please input point' }]}>
          <Input.TextArea />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />}>
            セーブ
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RecipeForm;
