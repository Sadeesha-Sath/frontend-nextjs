"use client";

import { useUserStore } from "@/store/store";

const { getAllTransactions } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllTransactions = () => {
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getAllTransactions();
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "TransactionID",
      key: "TransactionID",
      render: (text) => <a href={`/home/transactions/${text}`}>{text}</a>,
    },
    {
      title: "From Account Number",
      dataIndex: "FromAccNo",
      key: "FromAccNo",
    },
    {
      title: "To Account Number",
      dataIndex: "ToAccNo",
      key: "ToAccNo",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
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
      title: "Time Stamp",
      dataIndex: "TimeStamp",
      key: "TimeStamp",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        All Transactions
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

export default AllTransactions;
