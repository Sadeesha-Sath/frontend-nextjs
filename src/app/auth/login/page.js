"use client";

import "./login.css";
import { Form, Input, Button, Checkbox, Typography, Space, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { validEmail } from "@/constants/regex";
import { loginByEmail, loginByUsername } from "@/api/dataProvider";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { useState } from "react";

const { Title, Link } = Typography;

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    let res;
    try {
      if (validEmail.test(values.username_email)) {
        console.log("Email");
        res = await loginByEmail(values.username_email, values.password);
      } else {
        console.log("Username");
        res = await loginByUsername(values.username_email, values.password);
      }
      setLoading(false);
      if (res.status === 200) {
        if (values.remember) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.user);
        }
        setUser(res.data.user);
        setToken(res.data.token);
        router.replace("/home/dashboard");
      } else {
        console.log(res);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <center>
        <Title style={{ marginBottom: "40px" }} level={2}>
          Welcome Back!
        </Title>
      </center>
      <center>
      <Form
        security="true"
        name="login_form"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username_email"
          rules={[
            {
              required: true,
              message: "Please input your Username/Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username/Email"
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px", color: "#1777FF" }}>
          <Link
            className="login-form-right-align"
            style={{ fontSize: 13 }}
            href="/auth/reset_password"
          >
            Forgot password?
          </Link>
        </Form.Item>
        <Form.Item style={{ marginBottom: "15px" }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="login-form-left-align">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px", fontSize: 13 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item style={{ float: "left", marginBottom: 0 }}>
          New to A Bank?{" "}
          <span style={{ color: "#1777FF" }}>
            <Link href="/auth/signup">
              Register Now
            </Link>
          </span>
        </Form.Item>
        <Form.Item>
          <Spin spinning={loading} />
        </Form.Item>
      </Form>
      </center>
    </>
  );
};

export default LoginForm;
