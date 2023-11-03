"use client";
import { addTransaction, getAllAccounts } from "@/api/dataProvider";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Form, Input, Select, Typography } from "antd";
const { Title } = Typography;
import toast from "@/components/Toast";
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
  const [form] = Form.useForm();
  const trnTypes = [
    { value: "ATM", label: "ATM" },
    { value: "Online", label: "Online" },
  ];
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    toast.dismiss();
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const result = await addTransaction(values);
      if (result.status === 200) {
        console.log("Success");
        form.resetFields();
        notify("success", "Transaction Complete!");
      } else {
        console.log("Unsuccessful");
        notify("error", "Transaction Failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Form
          form={form}
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
            boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0",
            padding: "50px",
            borderRadius: 30,
          }}
        >
          <center>
            <Title style={{ marginBottom: "40px" }} level={3}>
              Fund Transfer
            </Title>
          </center>
          <Form.Item label="Payer Account Number">
            <Form.Item
              name="fromAccountNo"
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
              name="type"
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
                name="toAccountNo"
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
      </div>
    </div>
  );
};
export default FundTransfer;
