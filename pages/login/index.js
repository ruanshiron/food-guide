import { Form, Input, Button, Checkbox, Divider, Card, message } from "antd";
import { firebase } from "../../config/firebaseConfig";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "../../intl/useTranslation";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "../../utils/auth/AuthProvider";

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      router.push("/");
    } catch (error) {
      message.error(t("login_error"));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
      message.warn(t("logged_in_message"));
    }
  }, [user]);

  return (
    <div className="container container-lg">
      <div className="outer">
        <div className="middle">
          <Card className="login-form">
            <Divider>
              <Link href="/">FOODGUIDE</Link>
            </Divider>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  {t("login")}
                </Button>
              </Form.Item>

              <Divider></Divider>
              <Link href="/register">
                <Button className="signup-form-button" type="dashed">
                  {t("signup")}
                </Button>
              </Link>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
