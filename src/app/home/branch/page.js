"use client";

const { getBranches } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const { Title } = Typography;

const AllBranches = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getBranches();
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
      title: "Brnach ID",
      dataIndex: "BranchID",
      key: "BranchID",
      render: (text) => <a href={`/home/branches/${text}`}>{text}</a>,
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
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
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Manager ID",
      dataIndex: "ManagerID",
      key: "ManagerID",
    },
    {
      title: "Manager Name",
      dataIndex: "ManagerName",
      key: "ManagerName",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        Branches
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

export default AllBranches;
