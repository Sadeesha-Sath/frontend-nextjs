"use client";

import React from "react";
import "./login.css";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Link } = Typography;

const LoginForm = () => {
  const onFinish =async (values) => {
    console.log("Received values of form: ", values);
    const newValues = {
      username: values['username/email'],
      password: values['password']
    }
    const response = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      body: JSON.stringify(newValues),
      headers: {
        'Content-Type': 'application/json'
      }
      
    });
    const data = await response.json();
    console.log("data:", data)
    
  };

  const postDetails = async () =>{
  
  }
  return (
    <>
      <center>
        <Title style={{ marginBottom: "40px" }} level={2}>
          Welcome Back!
        </Title>
      </center>
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
          name="username/email"
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
            href=""
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
            Create User
          </Button>
        </Form.Item>
        <Form.Item style={{ float: "left", marginBottom: 0 }}>
          New to A Bank?{" "}
          <span style={{ color: "#1777FF" }}>
            <Link href="" target="_blank">
              Register Now
            </Link>
          </span>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;