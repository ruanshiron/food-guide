import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Spin,
  Row,
  Col,
  message,
} from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { storage } from "../config/firebaseConfig";
import { useState } from "react";
import useTranslation from "../intl/useTranslation";

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
  const [image, setImage] = useState();
  const [putImageRef, setPutImageRef] = useState();
  const [video, setVideo] = useState();
  const [putVideoRef, setPutVideoRef] = useState();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  

  const onGenderChange = (value) => {
    switch (value) {
      case "Rau":
        form.setFieldsValue({ note: "vegetable" });
        return;
      case "Thịt":
        form.setFieldsValue({ note: "meat" });
        return;
      case "Bánh":
        form.setFieldsValue({ note: "cheese" });
        return;
    }
  };

  const customUploadImage = async ({ onError, onSuccess, file }) => {
    const storageRef = await storage.ref();
    const fileExt = file.type.split("/").pop();
    const imgFile = storageRef.child(`recipes/${file.uid}.${fileExt}`);
    try {
      onSuccess(null, imgFile);
      setPutImageRef(imgFile);
    } catch (e) {
      onError(e);
    }
  };

  const beforeUploadImage = (image) => {
    setImage(image);
  };

  const customUploadVideo = async ({ onError, onSuccess, file }) => {
    const storageRef = await storage.ref();
    const fileExt = file.type.split("/").pop();
    const videoFile = storageRef.child(`recipes/${file.uid}.${fileExt}`);
    try {
      onSuccess(null, videoFile);
      setPutVideoRef(videoFile);
    } catch (e) {
      onError(e);
    }
  };

  const beforeUploadVideo = (video) => {
    setVideo(video);
  };

  const onFinish = async (values) => {
    setLoading(true);
    await putImageRef.put(image);
    await putVideoRef.put(video);

    values.image =
      values.image[0].uid + "." + values.image[0].type.split("/").pop();
    values.video =
      values.video[0].uid + "." + values.video[0].type.split("/").pop();
    onSubmitForm(values);

    setLoading(false);
  };

  return loading ? (
    <div style={{ textAlign: "center" }} className="container">
      <Spin tip={"Uploading..."} indicator={antIcon}></Spin>
    </div>
  ) : (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="title"
          label={t("料理名")}
          rules={[{ required: true, message: "Hãy nhập tên món ăn" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label={t("カテゴリ")}
          rules={[{ required: true, message: "Hãy nhập loại món" }]}
        >
          <Select
            placeholder={t("カテゴリを選択")}
            onChange={onGenderChange}
            allowClear
          >
            <Option value="Rau">Rau</Option>
            <Option value="Thịt">Thịt</Option>
            <Option value="Bánh">Bánh</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label={t("説明")}
          rules={[{ required: true, message: "Hãy nhập mô tả" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="image"
          label={t("写真")}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Hãy chèn thêm ảnh" }]}
        >
          <Upload
            beforeUpload={beforeUploadImage}
            listType="picture"
            customRequest={customUploadImage}
          >
            <Button icon={<UploadOutlined />}>{t("写真をアップロード")}</Button>
          </Upload>
        </Form.Item>

        <Form.Item label={t("ビデオ")}>
          <Form.Item
            name="video"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true, message: "Hãy chèn thêm video" }]}
          >
            <Upload.Dragger
              beforeUpload={beforeUploadVideo}
              customRequest={customUploadVideo}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {t("クリックまたドロップしてアップロードする")}
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
                  label={index === 0 ? t("材料") : ""}
                  key={field.key}
                >
                  <Row gutter={8}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                      name={[field.name, "name"]}
                      key={[field.name, "name"]}
                      rules={[{ required: true, message: "Hãy nhập tên" }]}
                    >
                      <Col>
                        <Input placeholder="Xoài" />
                      </Col>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                      name={[field.name, "quantity"]}
                      key={[field.name, "quantity"]}
                      rules={[
                        { required: true, message: "Hãy nhập số lượng" },
                      ]}
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
                  {t("材料を追加")}
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
                  label={index === 0 ? t("作り方") : ""}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    noStyle
                    rules={[{ required: true, message: "Hãy thêm các bước" }]}
                  >
                    <TextArea
                      placeholder="Nhập các bước"
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
                  {t("作り方を追加")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="point"
          label={t("ポイント")}
          rules={[{ required: true, message: "Hãy thêm chú ý" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<SaveOutlined />}
          >
            {t("セーブ")}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RecipeForm;
