"use client";

const { getCustomers } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const {Title} = Typography;

const AllCustomers = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getCustomers();
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.log(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  });
  const columns = [
    {
      title: "Customer ID",
      dataIndex: "CustomerID",
      key: "CustomerID",
      render: (text) => <a href={`/home/customers/${text}`}>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Customer Type",
      dataIndex: "CustomerType",
      key: "CustomerType",
    },
    {
      title: "NIC / BR",
      dataIndex: "NIC_BR",
      key: "NIC_BR",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Date of Birth",
      dataIndex: "DOB",
      key: "DOB",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        Customers
      </Title>
      {data.length === 0 ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} scroll={{ x: "max-content"}} />
      )}
    </>
  );
};

export default AllCustomers;
