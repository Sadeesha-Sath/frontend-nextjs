"use client";

const { getEmployees } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const {Title} = Typography;

const AllEmployees = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getEmployees();
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
      title: "Employee ID",
      dataIndex: "EmployeeID",
      key: "EmployeeID",
      render: (text) => <a href={`/home/employees/${text}`}>{text}</a>,
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
      title: "Position",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "Branch ID",
      dataIndex: "BranchID",
      key: "BranchID",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
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
        Employees
      </Title>
      {data === null ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} scroll={{ x: "max-content"}} />
      )}
    </>
  );
};

export default AllEmployees;
