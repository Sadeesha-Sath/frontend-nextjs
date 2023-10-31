"use client";

import { useUserStore } from "@/store/store";

const { getFD, getMyFD } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllFixedDeposits = () => {
    const user = useUserStore((state) => state.user);
  const [data, setData] = useState(null);
    const fetchData = async () => {
      
    const res = await(user.Role === "customer" ? getMyFD(): getFD());
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
      title: "Fixed Deposit ID",
      dataIndex: "FixedId",
      key: "FixedId",
      render: (text) => <a href={`/home/fixed-deposits/${text}`}>{text}</a>,
    },
    {
      title: "Savings Account Number",
      dataIndex: "SavingsAccNo",
      key: "SavingsAccNo",
    },
    {
      title: "Starting Amount",
      dataIndex: "StartingAmount",
      key: "StartingAmount",
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      key: "Duration",
    },
    {
      title: "Interest Rate",
      dataIndex: "InterestRate",
      key: "InterestRate",
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
    },
    {
      title: "Last Deposit Date",
      dataIndex: "LastDeptDate",
      key: "LastDeptDate",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        Fixed Deposits
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

export default AllFixedDeposits;
