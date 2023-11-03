"use client";

import usePermissions from "@/app/auth/permissions/permissions";
import ToastMessage from "@/components/Toast";
import React from "react";
const {
  getPendingLoanApplications,
  getBranchDetailsMinimal,
  approveLoanApplication,
  rejectLoanApplication,
} = require("@/api/dataProvider");
const {
  Table,
  Spin,
  Typography,
  Form,
  Select,
  Button,
  Flex,
  Space,
} = require("antd");
const { useState, useEffect } = require("react");

const { Title, Link } = Typography;

const PendingLoanApplications = () => {
  const [data, setData] = useState(null);
  const [branch, setBranch] = useState("ALL");
  const [shouldRender, setShouldRender] = useState(false);
  const [branchesData, setBranchesData] = useState(null);
  const fetchData = async () => {
    if (branch !== "ALL") {
      const res = await getPendingLoanApplications(branch);
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log(res.data);
        setShouldRender(false);
      }
    } else {
      const res = await getPendingLoanApplications();
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log(res.data);
        setShouldRender(false);
      }
    }
  };
  const fetchBranches = async () => {
    const res = await getBranchDetailsMinimal();
    if (res.status === 200) {
      setBranchesData([...res.data, { BranchID: "ALL", BranchName: "ALL" }]);
    } else {
      console.log(res.data);
    }
  };
  const notify = React.useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const dismiss = React.useCallback(() => {
    ToastMessage.dismiss();
  }, []);
  const approve = async (id) => {
    const response = await approveLoanApplication(id);
    if (response.status === 200) {
      notify("success", `Loan Application ${id} Approved`);
      console.log("success");
      fetchData();
    } else {
      notify("error", "Loan Approval Failed!");
      console.log("Not Successful");
      console.log(response.data);
    }
  };
  const reject = async (id) => {
    const response = await rejectLoanApplication(id);
    if (response.status === 200) {
      notify("success", `Loan Application ${id} Rejected`);
      console.log("success");
      fetchData();
    } else {
      notify("error", "Loan Rejection Failed!");
      console.log("Not Successful");
      console.log(response.data);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  const columns = [
    {
      title: "Loan Application ID",
      dataIndex: "LoanApplicationID",
      key: "LoanApplicationID",
      render: (text) => (
        <a href={`/home/loans/loanApplications/${text}`}>{text}</a>
      ),
    },
    {
      title: "Is Online",
      dataIndex: "IsOnline",
      key: "IsOnline",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Fixed Deposit ID",
      dataIndex: "FixedId",
      key: "FixedId",
    },
    {
      title: "Customer ID",
      dataIndex: "CustomerID",
      key: "CustomerID",
    },
    {
      title: "Branch ID",
      dataIndex: "BranchID",
      key: "BranchID",
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      key: "Duration",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Created Time Stamp",
      dataIndex: "CreatedTimeStamp",
      key: "CreatedTimeStamp",
    },
    {
      title: "Created By",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
    },
    {
      title: "Checked Date",
      dataIndex: "CheckedDate",
      key: "CheckedDate",
    },
    {
      title: "Checked By",
      dataIndex: "CheckedBy",
      key: "CheckedBy",
    },
  ];
  const canVerify = usePermissions("VERITY_LOAN_APPLICATIONS");
  const actions = [
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              approve(record.LoanApplicationID);
            }}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => {
              reject(record.LoanApplicationID);
            }}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Flex gap="middle" vertical>
        <Title level={2} key={"Title"}>
          Pending Loan Applications
        </Title>
        <Form
          layout="inline"
          onFinish={(values) => {
            fetchData();
            setShouldRender(true);
          }}
        >
          <Form.Item label="Branch" name="branch">
            <Select
              defaultValue={branch}
              onChange={(value) => {
                setBranch(value);
              }}
              style={{ minWidth: 250 }}
            >
              {branchesData &&
                branchesData.map((element) => (
                  <Select.Option key={element.BranchID}>
                    {element.BranchName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Get Data
            </Button>
          </Form.Item>
        </Form>

        {shouldRender ? (
          data === null ? (
            <Spin />
          ) : (
            <Table
              columns={canVerify ? [...columns, ...actions] : columns}
              dataSource={data}
              rowKey={(record) => record.LoanApplicationID}
              scroll={{ x: "max-content" }}
            />
          )
        ) : null}
      </Flex>
    </>
  );
};

export default PendingLoanApplications;
