import { Form, Input, Button, Select, Upload, Space } from "antd";
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const AddRecipeForm = () => {
  const [form] = Form.useForm();

  const onGenderChange = value => {
    switch (value) {
      case '1':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case '2':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case '3':
        form.setFieldsValue({ note: 'Hi there!' });
        return;
    }
  }

  return (
    <>
      <Form {...layout} name="control-hooks">
        <Form.Item name="title" label="料理名">
          <Input />
        </Form.Item>

        <Form.Item name="category" label="カテゴリ">
          <Select
            placeholder="カテゴリを選択"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="1">野菜</Option>
            <Option value="2">肉</Option>
            <Option value="3">チーズ</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="説明">
          <Input.TextArea />
        </Form.Item>
        
        <Form.Item
          name="写真"
          label="写真"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="image" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>写真をアップロード</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="ビデオ">
          <Form.Item name="video" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">クリックまたドロップしてアップロードする</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.List name="steps" >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '作り方' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input placeholder="材料を入力" style={{ width: '70%' }} />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                  />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ marginLeft: '23%', width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  作り方を追加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="ingredients">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '材料' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                  >
                    <Input placeholder="材料名" style={{ width: '70%' }} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                  >
                    <Input placeholder="分量" style={{ width: '70%' }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ marginLeft: '23%', width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  材料を追加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="point" label="ポイント">
          <Input.TextArea />
        </Form.Item>

      </Form>
    </>
  );
};

export default AddRecipeForm;
