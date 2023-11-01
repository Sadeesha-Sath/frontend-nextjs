"use client";

import React, { useState } from "react";
import "./styles.css";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Col,
  Row,
  Spin,
  DatePicker,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  HomeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { PiIdentificationCardLight } from "react-icons/pi";
import {
  checkUsername,
  addCustomer,
  getBranchDetailsMinimal,
} from "@/api/dataProvider";
import { useRouter } from "next/navigation";
import toast from "@/components/Toast";

const { Title, Link } = Typography;

const CreateCustomer = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const customerType = Form.useWatch("customerType", form);
  const username = Form.useWatch("username", form);
  const [validUser, setValidUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isValidUsername = async (e) => {
    console.log("Received Username: " + username);
    if (username) {
      try {
        const res = await checkUsername({ username });
        if (res.status === 200) {
          if (res.data.available) {
            setValidUser(true);
          } else {
            setValidUser(false);
          }
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [date, setDate] = useState(null);
  const onDatePickerChange = (date, dateString) => {
    setDate(dateString);
  };
  const notify = React.useCallback((type, message, description) => {
    toast({ type, message, description });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);
  const handleOnFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (values.password === values["confirm-pass"]) {
      setLoading(true);
      if (customerType === "Individual") {
        values.dob = date.split("T")[0];
      }
      let res;
      try {
        res = await addCustomer(values);
        setLoading(false);
        if (res.status === 200) {
          notify("success", "Customer Created!");
          router.back();
        } else {
          notify("error", "Customer Creation Failed!", res.data.message);
          console.log(res);
        }
      } catch (error) {
        setLoading(false);
        notify("error", "Customer Creation Failed!");
        console.log(error);
      }
    } else {
      console.log("passwords don't match");
    }
  };
  return (
    <>
      <div className="div-layout">
        <div
          style={{
            backgroundColor: "#F5F7F8",
            border: "0.5px solid grey",
            padding: "50px",
            paddingBottom: 0,
            borderRadius: 30,
          }}
        >
          <center>
            <Title style={{ marginBottom: "40px" }} level={2}>
              Create Customer
            </Title>
          </center>
          <center>
            <Form
              form={form}
              security="true"
              name="signup_form"
              className="signup-form"
              initialValues={{
                customerType: "Individual",
              }}
              requiredMark={false}
              onFinish={handleOnFinish}
            >
              <Row gutter={30}>
                <Col span={11}>
                  <Form.Item
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input a Username",
                      },
                    ]}
                  >
                    <Row gutter={2} justify="left" align="middle">
                      <Col span={validUser !== null ? 14 : 16}>
                        <Input
                          prefix={
                            <FaRegUserCircle className="site-form-item-icon" />
                          }
                          placeholder="Username"
                        />
                      </Col>
                      <Col span={8}>
                        <Button
                          style={{ maxWidth: "100%" }}
                          className="username-check"
                          onClick={isValidUsername}
                        >
                          Check
                        </Button>
                      </Col>

                      {validUser !== null ? (
                        validUser ? (
                          <Col span={2}>
                            <div style={{ minWidth: "100%" }}>
                              <CheckCircleTwoTone twoToneColor="#2AD24E" />
                            </div>
                          </Col>
                        ) : (
                          <Col span={2}>
                            <div style={{ minWidth: "100%" }}>
                              <CloseCircleTwoTone twoToneColor="#EB2F45" />
                            </div>
                          </Col>
                        )
                      ) : null}
                    </Row>
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your Email",
                      },
                    ]}
                  >
                    <Input
                      prefix={<TfiEmail className="site-form-item-icon" />}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm-pass"
                    rules={[
                      {
                        required: true,
                        message: "Please Confirm your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Divider type="vertical" style={{ height: "100%" }} />
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="customerType"
                    rules={[{ required: true }]}
                    label="Customer Type"
                  >
                    <Select placeholder="Customer Type">
                      <Select.Option value="Individual">
                        Individual
                      </Select.Option>
                      <Select.Option value="Organization">
                        Organization
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  {customerType === "Individual" ? (
                    <Form.Item
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Date of Birth is required",
                        },
                      ]}
                      label="Date of Birth"
                    >
                      <DatePicker
                        onChange={onDatePickerChange}
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    name="nic_br"
                    rules={[
                      {
                        required: true,
                        message: "Please input your NIC or BR",
                      },
                      {
                        min: customerType == "Individual" ? 10 : 6,
                        message:
                          customerType == "Individual"
                            ? "Please provide a valid NIC"
                            : "Please provide a valid Business Registration",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <PiIdentificationCardLight className="site-form-item-icon" />
                      }
                      type="text"
                      placeholder={
                        customerType == "Individual"
                          ? "NIC"
                          : "Business Registration"
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number",
                      },
                      {
                        min: 10,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your address",
                      },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined className="site-form-item-icon" />}
                      placeholder="Address"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Form.Item style={{ fontSize: 13, alignItem: "left" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="signup-form-button"
                    >
                      Create Customer
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Spin spinning={loading} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </center>
        </div>
      </div>
    </>
  );
};

export default CreateCustomer;
