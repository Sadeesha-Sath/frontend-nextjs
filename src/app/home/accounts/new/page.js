"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Typography, DatePicker } from "antd";
const { Title, Link } = Typography;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
import "./style.css";

const SavingsAccount = () => {
  const [date, setDate] = useState(null);
  const [cusType, setCusType] = useState(null);

  const cusTypes = [
    { value: "individual", label: "Individual" },
    { value: "organization", label: "Organization" },
  ];

  const onDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="form-container">
      <Form
        name="savingsAccount-form"
        onFinish={onFinish}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          backgroundColor: "#F5F7F8",
          maxWidth: "500px",
          marginBlock: "10px",
          paddingBlock: "75px",
          paddingInline: "25px",
          borderRadius: "10px",
          border: "0.2px solid grey",
        }}
      >
        <center>
          <Title style={{ marginBottom: "40px" }} level={3}>
            Open a Savings Account
          </Title>
        </center>
        <Form.Item
          label="NIC"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="nic"
            rules={[
              {
                required: true,
                message: "NIC is required",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter the NIC" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Name"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter the Name" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="dob"
          //   rules={[
          //     { required: true, message: "Date of Birth is required" },
          //   ]}
          label="Date of Birth"
        >
          <DatePicker onChange={onDatePickerChange} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Address"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter the address" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone number is required",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter a Phone Number" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Customer Type">
          <Form.Item
            name="customerType"
            noStyle
            rules={[
              {
                required: true,
                message: "Customer Type is required",
              },
            ]}
          >
            <Select
              className="select-container"
              onChange={(value) => setCusType(value)}
              value={cusType}
              style={{
                width: 200,
              }}
              placeholder="Choose Customer Type "
            >
              {cusTypes.map((option) => (
                <Select.Option key={option.value} account={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Proceed
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SavingsAccount;
