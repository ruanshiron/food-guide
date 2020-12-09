import { Form, Input, Button, Checkbox } from "antd";
import { firebase } from '../../config/firebaseConfig'
import React from "react";
import { useRouter } from "next/router";
import useTranslation from "../../intl/useTranslation";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function Login() {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Success:", values);
    await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
    router.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container container-lg">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Hãy nhập email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
