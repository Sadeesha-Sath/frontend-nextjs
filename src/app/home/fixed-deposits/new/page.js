"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Spin, Typography } from "antd";
const { Option } = Select;
const { Title, Link } = Typography;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
import "./styles.css";
import { getAccountBasic, getFDInterest } from "@/api/dataProvider";

const rates_fetch = async () => {
  try {
    const response = await getFDInterest();
    if (response.status === 200) {
      const rates_json = {};
      response.data.forEach((element) => {
        rates_json[element.Duration] = element.InterestRate;
      });
      return rates_json;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const account_fetch = async () => {
  try {
    const response = await getAccountBasic();
    if (response.status === 200) {
      const accounts = response.data.map((item) => ({
        value: item.AccountNo,
        label: item.AccountNo,
      }));
      return accounts;
    }
  } catch (error) {
    console.log("error", error);
  }
};

const AddFixedDeposit = () => {
  // const [account, setAccount] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [interestRates, setInterestRates] = useState([]);
  const [interestRate, setInterestRate] = useState(null);
  const [showRate, setShowRate] = useState(null);
  const [loading, setLoading] = useState(false);

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
          <Form
            name="transaction-form"
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
                Open a Fixed Deposit
              </Title>
            </center>
            <Form.Item label="Savings Account">
              <Form.Item
                name="savingsaccount"
                noStyle
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
            </Form.Item>

            <Form.Item label="Maturity Period">
              <Form.Item
                name="period"
                noStyle
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
              label="Amount"
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Amount is required to proceed",
                  },
                ]}
                style={{
                  display: "flex",
                  width: "800px",
                }}
              >
                <Input placeholder="Enter the amount" />
              </Form.Item>
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
export default AddFixedDeposit;
