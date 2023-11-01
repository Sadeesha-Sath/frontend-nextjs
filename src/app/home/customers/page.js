"use client";

import { useRouter } from "next/navigation";

const { getCustomers } = require("@/api/dataProvider");
const { Table, Spin, Typography, Button, Flex, Col } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllCustomers = () => {
  const [data, setData] = useState(null);
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
  }, []);
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
  const router = useRouter();
  return (
    <>
      <Flex gap="middle" vertical>
        <Title level={2} key={"Title"}>
          Customers
        </Title>
        <Col span={6}>
          <Button
            type="primary"
            onClick={(e) => {
              router.push("/home/customers/new");
            }}
          >
            Create New Customer
          </Button>
        </Col>
        {data === null ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.CustomerID}
            scroll={{ x: "max-content" }}
          />
        )}
      </Flex>
    </>
  );
};

export default AllCustomers;
