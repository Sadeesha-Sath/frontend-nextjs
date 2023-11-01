"use client";
import CustomTable from "@/components/customTable";
import { Spin, Table, Typography } from "antd";
import {
  getAllAccounts,
  getBranchDetailsMinimal,
  getMyAccounts,
} from "@/api/dataProvider";
import { useUserStore } from "@/store/store";
import _ from "lodash";
import { filterData } from "@/constants/helpers";
import { useEffect, useState } from "react";

const { Title } = Typography;

const AllAccounts = () => {
  const user = useUserStore((state) => state.user);
  const [branchNames, setBranchNames] = useState([]);
  const getBranchNames = async () => {
    const response = await getBranchDetailsMinimal();
    if (response.status === 200) {
      console.log(response.data);
      setBranchNames(response.data);
    }
  };
  useEffect(() => {
    getBranchNames();
  }, []);
  const columns = [
    {
      title: "Account No",
      dataIndex: "AccountNo",
      sorter: true,
      key: "AccountNo",
      render: (text) => <a href={`/home/accounts/${text}`}>{text}</a>,
    },
    {
      title: "Customer ID",
      dataIndex: "CustomerID",
      key: "CustomerID",
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
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
      filters: _.uniqWith(
        filterData(branchNames)((i) => i.BranchName),
        _.isEqual
      ),
      filterMode: "tree",
      // onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
    },
    {
      title: "Savings Account Type",
      dataIndex: "SavingsPlanType",
      key: "SavingsPlanType",
      filters: [
        { text: "Adult", value: "Adult" },
        { text: "Teen", value: "Teen" },
        { text: "Senior", value: "Senior" },
        { text: "Children", value: "Children" },
      ],
    },
    {
      title: "Account Balance",
      dataIndex: "Balance",
      key: "Balance",
    },
    {
      title: "Parent ID",
      dataIndex: "ParentID",
      key: "ParentID",
    },
    {
      title: "Parent Name",
      dataIndex: "ParentName",
      key: "ParentName",
    },
    {
      title: "Monthly Transaction Count",
      dataIndex: "MonthlyTransactionCount",
      key: "MonthlyTransactionCount",
    },
  ];
  return (
    <>
      <Title level={2} key={"Title"}>
        Accounts
      </Title>
      {branchNames.length === 0 ? (
        <div>
          <Spin key={"Spinner"} />
        </div>
      ) : (
        <CustomTable
          dataMethod={user.Role == "customer" ? getMyAccounts : getAllAccounts}
          columns={columns}
          key={"Table"}
          rowKey={(record) => record["AccountNo"]}
          initData={{}}
        ></CustomTable>
      )}
    </>
  );
};

export default AllAccounts;
