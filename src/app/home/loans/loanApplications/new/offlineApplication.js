"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Spin, Typography } from "antd";
const { Title } = Typography;
import "./styles.css";
import {
  addOfflineLoanApplication,
  getFDofUser,
  getLoanInterest,
  checkNIC,
} from "@/api/dataProvider";
import toast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { set } from "lodash";

const OfflineApplication = () => {
  const [interestRates, setInterestRates] = useState([]);
  const [interestRate, setInterestRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [validUser, setValidUser] = useState(null);
  const duration = Form.useWatch("Duration", form);
  const [customerID, setCustomerID] = useState(null);
  const [durations, setDurations] = useState([]);
  const type = Form.useWatch("type", form);
  const nic = Form.useWatch("NIC_BR", form);

  const notify = React.useCallback((type, message, description) => {
    toast({ type, message, description });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (validUser === null) {
      await isValidNIC();
    }
    if (validUser) {
      try {
        const res = await addOfflineLoanApplication({ ...values, customerID });
        if (res.status === 200) {
          notify("success", "Online Loan Application Created!");
          router.back();
        } else {
          notify(
            "error",
            "Online Loan Application Creation Failed!",
            res.data.message
          );
          console.log(res);
        }
      } catch (err) {
        console.error(err);
        notify("error", "Online Loan Application Creation Failed!");
      }
    } else {
      notify("error", "Please enter a valid NIC/BR");
    }
  };
  //   const fetchFixedData = async (userID) => {
  //     const res = await getFDofUser(userID);
  //     console.log("Finished Fetching");
  //     if (res.status === 200) {
  //       console.log("Setting Fixed List");
  //       setFixedList(res.data);
  //       console.log("Fixed List Set");
  //     } else {
  //       console.log(res.data);
  //     }
  //   };
  const fetchRateData = async () => {
    setLoading(true);
    const res = await getLoanInterest();
    if (res.status === 200) {
      setInterestRates(res.data);
    } else {
      console.error(res.data);
    }
    setLoading(false);
  };
  const setRate = () => {
    if (duration && type) {
      for (let record of interestRates) {
        if (record.Duration == duration && record.Type == type) {
          setInterestRate(record.InterestRate);
        }
      }
    }
  };
  const isValidNIC = async (e) => {
    console.log("Received NIC: " + nic);
    if (nic) {
      try {
        const res = await checkNIC(nic);
        if (res.status === 200) {
          if (res.data.exists) {
            console.log("Start Fetching");
            setCustomerID(res.data.customerID);
            // await fetchFixedData(res.data.userID);
            console.log("Setting User to Valid");
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

  useEffect(() => {
    // fetchFixedData();
    fetchRateData();
  }, []);

  useEffect(() => {
    if (type) {
      setDuration();
    }
  }, [type]);
  const setDuration = () => {
    const newDurations = [];
    for (let record of interestRates) {
      if (record.Type == type) {
        newDurations.push({ Duration: record.Duration, Type: record.Type });
      }
    }
    setDurations(newDurations);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <center>
          <div className="form-container">
            <center>
              <Title style={{ marginBottom: "40px" }} level={3}>
                Offline Loan Application
              </Title>
            </center>
            <Form
              name="application-form"
              onFinish={onFinish}
              form={form}
              wrapperCol={10}
              labelCol={8}
              labelWrap={true}
            >
              <Form.Item
                label="NIC/BR"
                name="NIC_BR"
                rules={[
                  {
                    required: true,
                    message: "NIC/BR is required to proceed",
                  },
                ]}
              >
                <Row gutter={2} justify="left" align="middle">
                  <Col span={validUser !== null ? 14 : 16}>
                    <Input placeholder="NIC/BR" />
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{ maxWidth: "100%" }}
                      className="nic-check"
                      onClick={isValidNIC}
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
              {/* <Form.Item
                label="Fixed Deposit Number"
                name="FixedId"
                rules={[
                  {
                    required: true,
                    message: "Fixed Deposit is required",
                  },
                ]}
              >
                <Select
                  disabled={!validUser}
                  className="select-container"
                  // style={{
                  //   width: 200,
                  // }}
                  placeholder="Choose a fixed deposit"
                >
                  {fixedList.map((option) => (
                    <Select.Option key={option.FixedId} value={option.FixedId}>
                      {option.FixedId}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> */}
              <Form.Item
                label="Loan Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Select a Loan Type",
                  },
                ]}
              >
                <Select placeholder="Select Loan Type">
                  <Select.Option key="1" value="Business">
                    Personal
                  </Select.Option>
                  <Select.Option key="2" value="Personal">
                    Business
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Loan Duration"
                name="Duration"
                rules={[
                  {
                    required: true,
                    message: "Select a Duraion",
                  },
                ]}
              >
                <Select
                  className="select-container"
                  onChange={() => {
                    setRate();
                  }}
                  disabled={durations.length === 0}
                  placeholder="Select Loan Duration"
                >
                  {durations.map((option) => (
                    <Select.Option
                      key={option.Duration + option.Type}
                      value={option.Duration}
                    >
                      {option.Duration} Months
                    </Select.Option>
                  ))}
                  {/* <Select.Option key="p1" value="6">
                  6 Months
                </Select.Option>
                <Select.Option key="p2" value="12">
                  1 Year
                </Select.Option>
                <Select.Option key="p3" value="36">
                  3 Years
                </Select.Option> */}
                </Select>
              </Form.Item>
              {interestRate && (
                <Form.Item
                  label="Interest Rate"
                  style={{ color: "Red", fontWeight: "bold" }}
                >
                  {(interestRate * 100).toFixed(2)}%
                </Form.Item>
              )}

              <Form.Item
                name="Amount"
                rules={[
                  {
                    required: true,
                    message: "Amount is required to proceed",
                  },
                ]}
                label="Amount"
              >
                <Input placeholder="Enter the amount" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Proceed
                </Button>
              </Form.Item>
            </Form>
          </div>
        </center>
      )}
    </>
  );
};

export default OfflineApplication;
