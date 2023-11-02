"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Typography } from "antd";
const { Title } = Typography;
import "./styles.css";
import { addOnlineLoanApplication } from "@/api/dataProvider";
import toast from "@/components/Toast";
import { useRouter } from "next/navigation";

const OnlineApplication = () => {
  const [fixedList, setFixedList] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [interestRates, setInterestRates] = useState([]);
  const [interestRate, setInterestRate] = useState(null);
  const [showRate, setShowRate] = useState(null);
  const [loading, setLoading] = useState(false);

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
        notify("error", "Online Loan Application Creation Failed!");
        console.log(res);
      }
    } catch (err) {
      console.error(err);
      notify("error", "Online Loan Application Creation Failed!");
    }
  };

  useEffect(() => {
    setLoading(true);
    rates_fetch()
      .then((rates) => {
        setInterestRates(rates);
      })
      .catch((error) => {
        console.error(error);
      });
    account_fetch()
      .then((accounts) => {
        setAccountList(accounts);
        console.log(accounts);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="form-container">
          <center>
            <Title style={{ marginBottom: "40px" }} level={3}>
              Online Loan Application
            </Title>
          </center>
          <Form name="application-form" onFinish={onFinish}>
            <Form.Item
              label="Savings Account"
              name="savingsaccount"
              rules={[
                {
                  required: true,
                  message: "Savings Account is required",
                },
              ]}
            >
              <Select
                className="select-container"
                style={{
                  width: 200,
                }}
                placeholder="Choose a bank account"
              >
                {accountList.map((option) => (
                  <Select.Option key={option.value} account={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Maturity Period"
              name="period"
              rules={[
                {
                  required: true,
                  message: "Select a period",
                },
              ]}
            >
              <Select
                className="select-container"
                onChange={(value) => {
                  setSelectedPeriod(value);
                  setInterestRate(interestRates[value]);
                  setShowRate(true);
                }}
                value={selectedPeriod}
                style={{
                  width: 200,
                }}
                placeholder="Select Maturity Period"
              >
                <Select.Option key="p1" value="6">
                  6 Months
                </Select.Option>
                <Select.Option key="p2" value="12">
                  1 Year
                </Select.Option>
                <Select.Option key="p3" value="36">
                  3 Years
                </Select.Option>
              </Select>
            </Form.Item>
            {showRate && (
              <Form.Item
                label="Interest Rate"
                style={{ color: "Red", fontWeight: "bold" }}
              >
                {(interestRate * 100).toFixed(2)}%
              </Form.Item>
            )}

            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Amount is required to proceed",
                },
              ]}
              label="Amount"
              style={{
                marginBottom: 0,
              }}
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
      )}
    </>
  );
};

export default OnlineApplication;
