import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { BsArrowLeftRight, BsFilePerson, BsPeople } from "react-icons/bs";
import { GiPiggyBank } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { CiWallet } from "react-icons/ci";
import { FcMoneyTransfer } from "react-icons/fc";
import { TbReportAnalytics } from "react-icons/tb";

const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});

const menuItemsCustomer = [
  getItem("Dashboard", "/home/dashboard", <HomeOutlined />, null),
  getItem("My Accounts", "/home/accounts", <CiWallet />, null),
  getItem(
    "Transfer Funds",
    "/home/transactions/new",
    <FcMoneyTransfer />,
    null
  ),
  getItem("All Transactions", "/home/transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "/home/fixed-deposits", <GiPiggyBank />, null),
  getItem("Loans", "loans", <BankOutlined />, [
    getItem("All Loans", "/home/loans", null, null),
    getItem("Active Loans", "/home/loans/activeLoans", null, null),
    getItem(
      "Request Online Loan",
      "/home/loans/loanApplications/new",
      null,
      null
    ),
    getItem("My Loan Applications", "/home/loans/loanApplications", null, null),
    getItem(
      "My Pending Installments",
      "/home/loans/installments/pending",
      null,
      null
    ),
  ]),
];

const menuItemsEmployee = [
  getItem("Dashboard", "/home/dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "/home/accounts", <CiWallet />, null),
  getItem(
    "Transfer Funds",
    "/home/transactions/new",
    <FcMoneyTransfer />,
    null
  ),
  getItem("All Fixed Deposits", "/home/fixed-deposits", <GiPiggyBank />, null),
  getItem("Users", "/home/users", <GoPerson />),
  getItem("Customers", "/home/customers", <BsPeople />),
  getItem("Employees", "/home/employees", <BsFilePerson />),
  getItem("Loan Management", "loans", <BankOutlined />, [
    getItem("All Loans", "/home/loans", null, null),
    getItem("Active Loans", "/home/loans/activeLoans", null, null),
    getItem(
      "Request Offline Loan",
      "/home/loans/loanApplications/new",
      null,
      null
    ),
    getItem(
      "All Loan Applications",
      "/home/loans/loanApplications",
      null,
      null
    ),
    getItem(
      "Pending Installements",
      "/home/loans/installments/pending",
      null,
      null
    ),
  ]),
];

const menuItemsBManager = [
  getItem("Dashboard", "/home/dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "/home/accounts", <CiWallet />, null),
  getItem(
    "Transfer Funds",
    "/home/transactions/new",
    <FcMoneyTransfer />,
    null
  ),
  getItem("All Transactions", "/home/transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "/home/fixed-deposits", <GiPiggyBank />, null),
  getItem("Users", "/home/users", <GoPerson />),
  getItem("Customers", "/home/customers", <BsPeople />),
  getItem("Employees", "/home/employees", <BsFilePerson />),
  getItem("Loan Management", "loans", <BankOutlined />, [
    getItem("All Loans", "/home/loans", null, null),
    getItem("Active Loans", "/home/loans/activeLoans", null, null),
    getItem(
      "Request Offline Loan",
      "/home/loans/loanApplications/new",
      null,
      null
    ),
    getItem(
      "All Loan Applications",
      "/home/loans/loanApplications",
      null,
      null
    ),
    getItem(
      "Pending Installements",
      "/home/loans/installments/pending",
      null,
      null
    ),
    getItem(
      "Overdue Installments",
      "/home/loans/installments/overdue",
      null,
      null
    ),
  ]),
  getItem("Reports", "/home/reports", <TbReportAnalytics />, null),
];

const menuItemsAdmin = [
  getItem("Dashboard", "/home/dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "/home/accounts", <CiWallet />, null),
  getItem(
    "Transfer Funds",
    "/home/transactions/new",
    <FcMoneyTransfer />,
    null
  ),
  getItem("All Transactions", "/home/transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "/home/fixed-deposits", <GiPiggyBank />, null),
  getItem("Branch Management", "/home/branch", <BankOutlined />),
  getItem("Users", "/home/users", <GoPerson />),
  getItem("Customers", "/home/customers", <BsPeople />),
  getItem("Employees", "/home/employees", <BsFilePerson />),
  getItem("Loan Management", "loans", <BankOutlined />, [
    getItem("All Loans", "/home/loans", null, null),
    getItem("Active Loans", "/home/loans/activeLoans", null, null),
    getItem(
      "Request Offline Loan",
      "/home/loans/loanApplications/new",
      null,
      null
    ),
    getItem(
      "All Loan Applications",
      "/home/loans/loanApplications",
      null,
      null
    ),
    getItem(
      "Pending Installements",
      "/home/loans/installments/pending",
      null,
      null
    ),
    getItem(
      "Overdue Installments",
      "/home/loans/installments/overdue",
      null,
      null
    ),
  ]),
  getItem("Reports", "/home/reports", <TbReportAnalytics />, null),
];

export {
  menuItemsCustomer,
  menuItemsEmployee,
  menuItemsBManager,
  menuItemsAdmin,
};
