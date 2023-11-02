"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Typography } from "antd";
const { Title } = Typography;
import "./styles.css";
import {
  addOnlineLoanApplication,
  getFD,
  getLoanInterest,
} from "@/api/dataProvider";
import toast from "@/components/Toast";
import { useRouter } from "next/navigation";

const OnlineApplication = () => {
  const [fixedList, setFixedList] = useState([]);
  const [interestRates, setInterestRates] = useState([]);
  const [interestRate, setInterestRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [durations, setDurations] = useState([]);
  const [form] = Form.useForm();
  const duration = Form.useWatch("Duration", form);
  const type = Form.useWatch("type", form);

  const notify = React.useCallback((type, message, description) => {
    toast({ type, message, description });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await addOnlineLoanApplication(values);
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
  };
  const fetchFixedData = async () => {
    const res = await getFD();
    if (res.status === 200) {
      setFixedList(res.data);
    } else {
      console.log(res.data);
    }
  };
  const fetchRateData = async () => {
    const res = await getLoanInterest();
    if (res.status === 200) {
      setInterestRates(res.data);
    } else {
      console.error(res.data);
    }
  };
  const setRate = () => {
    if (duration && type) {
      for (let record of interestRates) {
        if (record.Duration == duration && record.Type == type) {
          setInterestRate(record.interestRate);
        }
      }
    }
  };

  const setDuration = () => {
    const newDurations = [];
    for (let record of interestRates) {
      if (record.Type == type) {
        newDurations.push({ Duration: record.Duration, Type: record.Type });
      }
    }
    setDurations(newDurations);
  };

  useEffect(() => {
    if (type) {
      setDuration();
    }
  }, [type]);

  useEffect(() => {
    setLoading(true);
    fetchFixedData();
    fetchRateData();
    setLoading(false);
  }, []);
  console.log(type);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <center>
          <div className="form-container">
            <center>
              <Title style={{ marginBottom: "40px" }} level={3}>
                Online Loan Application
              </Title>
            </center>
            <Form name="application-form" onFinish={onFinish} form={form}>
              <Form.Item
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
              </Form.Item>
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
                  disabled={!type}
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

              <Form.Item label=" " colon={false}>
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

export default OnlineApplication;
