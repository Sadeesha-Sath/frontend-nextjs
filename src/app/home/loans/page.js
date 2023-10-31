"use client";

const { getLoans } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllLoans = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getLoans();
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.log(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      title: "Loan ID",
      dataIndex: "LoanID",
      key: "LoanID",
      render: (text) => <a href={`/home/loans/${text}`}>{text}</a>,
    },
    {
      title: "Customer ID",
      dataIndex: "CustomerID",
      key: "CustomerID",
    },
    {
      title: "Loan Application ID",
      dataIndex: "LoanApplicationID",
      key: "LoanApplicationID",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
    },
    {
      title: "Installment",
      dataIndex: "Installment",
      key: "Installment",
    },
    {
      title: "Balance",
      dataIndex: "Balance",
      key: "Balance",
    },
    {
      title: "Is Online",
      dataIndex: "IsOnline",
      key: "IsOnline",
    },
    {
      title: "Fixed ID",
      dataIndex: "FixedId",
      key: "FixedId",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        All Loans
      </Title>
      {data === null ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      )}
    </>
  );
};

export default AllLoans;
