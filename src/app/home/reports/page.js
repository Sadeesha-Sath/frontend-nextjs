"use client";
import React, { useEffect, useState } from "react";
import { Select, Input, Form, Button, Table, Spin } from "antd";
import "./style.css";
import { getBranchDetailsMinimal, getViews } from "@/api/dataProvider";
import { set } from "lodash";
import Title from "antd/es/typography/Title";

const branch_fetch = async () => {
  try {
    const response = await getBranchDetailsMinimal();
    if (response.status === 200) {
      const branches = response.data.map((item) => ({
        value: item.BranchID,
        label: item.BranchName,
      }));
      console.log(branches);
      return branches;
    } else {
      console.log("error", response.data);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const view_fetch = async (branch, reportType) => {
  try {
    const response = await getViews(branch, reportType);
    console.log(response);
    if (response.status === 200) {
      let view;
      if (reportType == "transaction") {
        view = response.data.map((item, index) => ({
          key: (index + 1).toString(),
          ...item,
        }));
      } else if (reportType == "loan") {
        view = response.data.map((item, index) => ({
          key: (index + 1).toString(),
          LoanID: item.LoanID,
          CustomerID: item.CustomerID,
          Installment: item.Installment,
          DueDate: item.DueDate,
        }));
      }
      return view;
    } else {
      console.log("error", response.data);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const Report = () => {
  const [reportType, setReportType] = useState(null);
  const [branch, setBranch] = useState(null);
  const [showtrTable, setShowtrTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [view, setView] = useState([]);
  const [columns, setColumns] = useState([]);
  const reports = [
    { value: "transaction", label: "Total Transaction" },
    { value: "loan", label: "Late Loan Installment" },
  ];

  const column = {
    transaction: [
      {
        title: "Transaction ID",
        dataIndex: "TransactionID",
        key: "TransactionID",
      },
      {
        title: "Debited Account",
        dataIndex: "ToAccNo",
        key: "ToAccNo",
      },
      {
        title: "Credited Account",
        dataIndex: "FromAccNo",
        key: "FromAccNo",
      },
      {
        title: "Transaction Type",
        dataIndex: "TrnType",
        key: "TrnType",
      },
      {
        title: "Amount",
        dataIndex: "Amount",
        key: "Amount",
      },
      {
        title: "Debited Branch",
        dataIndex: "DebitedBranchName",
        key: "DebitedBranchName",
      },
      {
        title: "Credited Branch",
        dataIndex: "CreditedBranchName",
        key: "CreditedBranchName",
      },
    ],
    loan: [
      {
        title: "Loan ID",
        dataIndex: "LoanID",
        key: "LoanID",
      },
      {
        title: "Customer ID",
        dataIndex: "CustomerID",
        key: "CustomerID",
      },
      {
        title: "Installment",
        dataIndex: "Installment",
        key: "Installment",
      },
      {
        title: "Due Date",
        dataIndex: "DueDate",
        key: "DueDate",
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    branch_fetch()
      .then((branches) => {
        setLoading(false);
        setBranchList(branches);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = async () => {
    console.log(branch, reportType);
    if (reportType) {
      const data = await view_fetch(branch, reportType);
      setView(data);
      setShowtrTable(true);
      setColumns(column[reportType]);
      // } else if(reportType == 'loan'){
      //   const data =await view_fetch(branch, reportType);
      //   setView(data);
      //   setShowtrTable(true);
    } else {
      setShowtrTable(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className="centered-container">
          <Title level={2}>Reports</Title>
          <div className="input-container">
            <Form onFinish={handleClick} layout="inline">
              <Form.Item>
                <Select
                  className="select-container"
                  value={reportType}
                  onChange={(value) => setReportType(value)}
                  style={{ width: 200 }}
                  placeholder="Select Report Type"
                >
                  {reports.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Select
                  className="select-container"
                  value={branch}
                  onChange={(value) => setBranch(value)}
                  style={{ width: 200 }}
                  placeholder="Select a Branch"
                >
                  {branchList.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="generate-button"
                >
                  Generate
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div style={{ marginTop: 30 }}>
            {showtrTable && (
              <Table
                className="table-container"
                  dataSource={view}
                  rowKey={(record) => record.key}
                columns={columns}
                scroll={{ x: "max-content" }}
                bordered
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
