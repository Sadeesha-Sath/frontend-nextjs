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
  addEmployee,
  checkUsername,
  getBranchDetailsMinimal,
} from "@/api/dataProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const { Title, Link } = Typography;

const CreateEmployee = () => {
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
  const [branchesData, setBranchesData] = useState(null);
  const fetchBranches = async () => {
    const res = await getBranchDetailsMinimal();
    if (res.status === 200) {
      setBranchesData(res.data);
    } else {
      console.log(res.data);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  const handleOnFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (values.password === values["confirm-pass"]) {
      setLoading(true);

      try {
        const res = await addEmployee(values);
        // res = await signup(values);
        setLoading(false);
        if (res.status === 200) {
          router.back();
        } else {
          console.log(res);
        }
      } catch (error) {
        setLoading(false);
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
              Create Employee
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
                    name="branchID"
                    rules={[{ required: true }]}
                    label="Branch"
                  >
                    <Select placeholder="Branch">
                      {branchesData &&
                        branchesData.map((element) => (
                          <Select.Option
                            key={element.BranchID}
                            value={element.BranchID}
                          >
                            {element.BranchName}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="position"
                    rules={[
                      {
                        required: true,
                        message: "Please a Position",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Position" />
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
                      Create Employee
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

export default CreateEmployee;
