"use client";

const {
  getAllLoanInstallments,
  getBranchDetailsMinimal,
} = require("@/api/dataProvider");
const { Table, Spin, Typography, Form, Select, Button, Flex } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllLoanInstallments = () => {
  const [data, setData] = useState(null);
  const [branch, setBranch] = useState("ALL");
  const [shouldRender, setShouldRender] = useState(false);
  const [branchesData, setBranchesData] = useState(null);
  const fetchData = async () => {
    if (branch !== "ALL") {
      const res = await getAllLoanInstallments(branch);
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log(res.data);
        setShouldRender(false);
      }
    } else {
      const res = await getAllLoanInstallments();
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
  useEffect(() => {
    fetchBranches();
  }, []);
  const columns = [
    {
      title: "Loan ID",
      dataIndex: "LoanID",
      key: "LoanID",
    },
    {
      title: "Due Date",
      dataIndex: "DueDate",
      key: "DueDate",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Payment Date",
      dataIndex: "PaymentDate",
      key: "PaymentDate",
    },
    {
      title: "Installment",
      dataIndex: "Installment",
      key: "Installment",
    },
    {
      title: "Branch ID",
      dataIndex: "BranchID",
      key: "BranchID",
    },
    {
      title: "Customer ID",
      dataIndex: "CustomerID",
      key: "CustomerID",
    },
    {
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
    },
  ];
  return (
    <>
      <Flex gap="middle" vertical>
        <Title level={2} key={"Title"}>
          All Loan Installments
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
              columns={columns}
              dataSource={data}
              scroll={{ x: "max-content" }}
            />
          )
        ) : null}
      </Flex>
    </>
  );
};

export default AllLoanInstallments;
