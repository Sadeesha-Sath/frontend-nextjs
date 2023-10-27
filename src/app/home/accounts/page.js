"use client";
import CustomTable from "@/components/customTable";
import { Typography } from "antd";
import { getAllAccounts, getMyAccounts } from "@/api/dataProvider";
import { useUserStore } from "@/store/store";

const { Title } = Typography;

const AllAccounts = () => {
  const user = useUserStore((state) => state.user);
  const columns = [
    "AccountNo",
    "CustomerID",
    "BranchID",
    "Balance",
    "SavingsPlanType",
    "ParentID",
    "MonthlyTransactionCount",
  ];
  return (
    <>
      <Title level={2}>Accounts</Title>
      <CustomTable
        dataMethod={user.Role == "customer" ? getMyAccounts : getAllAccounts}
        columns={columns}
        key={columns}
      ></CustomTable>
    </>
  );
};

export default AllAccounts;
