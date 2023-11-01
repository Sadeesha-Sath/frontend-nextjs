"use client";
import {
  getAllAccounts,
  getBranchDetailsMinimal,
  getMyAccounts,
} from "@/api/dataProvider";
import { useUserStore } from "@/store/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Form, Input, Select, Typography } from "antd";
const { Title, Link } = Typography;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
import "./style.css";

//account fetch must be fixed   get my accounts
const account_fetch = async (data) => {
  try {
    const response = await getAllAccounts(data);
    const accounts = response.data.map((item) => ({
      value: item.AccountNo,
      label: item.AccountNo,
    }));
    return accounts;
  } catch (error) {
    console.log("error", error);
  }
};

//need to be continued

const FundTransfer = () => {
  const [accountList, setAccountList] = useState([]);
  const [trnType, setTrnType] = useState("atm");
  const trnTypes = [
    { value: "atm", label: "ATM" },
    { value: "online", label: "Online" },
  ];

  useEffect(() => {
    account_fetch()
      .then((accounts) => {
        setAccountList(accounts);
        console.log(accounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="form-container">
      <center>
        <Form
          name="fundtransfer-form"
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
            padding: "50px",
            borderRadius: "10px",
            border: "0.2px solid grey",
          }}
        >
          <center>
            <Title style={{ marginBottom: "40px" }} level={3}>
              Fund Transfer
            </Title>
          </center>
          <Form.Item label="Payer Account Number">
            <Form.Item
              name="FromAccount"
              style={{ display: "flex", width: "800px", marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Payer Account is required",
                },
              ]}
            >
              <AutoComplete
                style={{
                  width: 200,
                }}
                options={accountList}
                placeholder="Enter Payer Account"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              {/* <Select
                className="select-container"
                onChange={(value) => setAccount(value)}
                value={account}
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
              </Select> */}
            </Form.Item>
          </Form.Item>

          <Form.Item label="Transaction Type">
            <Form.Item
              name="trnType"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Transaction Type is required",
                },
              ]}
            >
              <Select
                className="select-container"
                onChange={(value) => setTrnType(value)}
                value={trnType}
                style={{
                  width: 200,
                }}
                placeholder="Select Transaction Type"
              >
                {trnTypes.map((option) => (
                  <Select.Option key={option.value} trnType={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          {trnType == "online" && (
            <Form.Item
              label="Payee Account Number:"
              style={{
                marginBottom: 0,
                color: "#F4CE14",
              }}
            >
              <Form.Item
                name="ToAccount"
                rules={[
                  {
                    required: true,
                    message: "Payee account is required",
                  },
                ]}
                style={{
                  display: "flex",
                  width: "800px",
                }}
              >
                <AutoComplete
                  style={{
                    width: 200,
                  }}
                  options={accountList}
                  placeholder="Enter Beneficiary Account"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  disabled={trnType === "atm"}
                />
              </Form.Item>
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
                  message: "Amount is required to process",
                },
              ]}
              style={{
                display: "flex",
                width: "800px",
              }}
            >
              <Input style={{ width: 200 }} placeholder="Enter the amount" />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Description">
            <Form.Item
              name="description"
              style={{ marginBottom: 0, display: "flex", width: "800px" }}
              rules={[
                {
                  required: true,
                  message: "Please provide a description",
                },
              ]}
            >
              <Input.TextArea
                style={{ width: 200 }}
                placeholder="Enter Description of the transfer"
                autoSize
              />
            </Form.Item>
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Proceed
            </Button>
          </Form.Item>
        </Form>
      </center>
    </div>
  );
};
export default FundTransfer;
