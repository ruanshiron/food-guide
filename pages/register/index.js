import { Form, Input, Button, Checkbox } from "antd";
import { firebase, database } from '../../config/firebaseConfig'
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

export default function Register() {
  const router = useRouter();
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (values.password !== values.confirmPassword) {
      // toast here
      router.push("/register");
    } else {
      const res = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
      const user = {
        email: res.user.email,
        uid: res.user.uid,
        name: values.name
      };
      await database.collection("users").add(user);
      // toast here
      router.push("/");
    }
    
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
          label="Họ tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>

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

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu xác nhận",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
