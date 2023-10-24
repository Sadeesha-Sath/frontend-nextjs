"use client";

import React, { useState } from "react";
import "./signup.css";
import { Form, Input, Button, Checkbox, Typography, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";


const { Title, Link } = Typography;

const SignUpForm = () => {
  
  const handleOnFinish = (e) => {
    console.log(e)
  };
  return (
    <>
      <center>
        <Title style={{ marginBottom: "40px" }} level={2}>
          Sign Up
        </Title>
      </center>
      <Form
        security="true"
        name="signup_form"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleOnFinish}
      >


        <Form.Item
          style={{ marginBottom: "20px" }}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>



        <Form.Item
          style={{ marginBottom: "20px" }}
          name="NIC"
          rules={[
            {
              required: true,
              message: "Please input your NIC",
            },{
              min: 10,
              message: "Please provide a valid NIC", 
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="NIC"
          />
        </Form.Item>



        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            }, {
              min: 10,
              message: "Please enter a valid phone number", 
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
          />
        </Form.Item>


        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter your address",
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Address"
          />
        </Form.Item>

        <Form.Item name="customertype"  rules={[{ required: true }]}>
            <Select
              prefix={<UserOutlined className="site-form-item-icon" />} // Use the prefix property to add the prefix element
              placeholder="Customer Type"
              allowClear
            >
              <Option value="Individual">Individual</Option>
              <Option value="Organization">Organization</Option>
            </Select>
        
      </Form.Item>



        <Form.Item style={{ marginBottom: "10px", color: "#1777FF" }}>
          <Link
            className="signup-form-right-align"
            style={{ fontSize: 13 }}
            href=""
          >
            Forgot password?
          </Link>
        </Form.Item>
        <Form.Item style={{ marginBottom: "15px" }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="signup-form-left-align">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>



        <Form.Item style={{ marginBottom: "10px", fontSize: 13 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Sign Up
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

export default SignUpForm;
