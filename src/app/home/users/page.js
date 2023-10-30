"use client";

const { getUsers } = require("@/api/dataProvider");
const { Table, Spin, Typography } = require("antd");
const { useState, useEffect } = require("react");

const {Title} = Typography;

const AllUsers = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const res = await getUsers();
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
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
      render: (text) => <a href={`/home/users/${text}`}>{text}</a>,
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
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        Users
      </Title>
      {data === null ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} scroll={{ x: "max-content"}} />
      )}
    </>
  );
};

export default AllUsers;
