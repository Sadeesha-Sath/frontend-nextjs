import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { BsArrowLeftRight } from "react-icons/bs";
import { GiPiggyBank } from "react-icons/gi";
import { CiWallet } from "react-icons/ci";
import { FaMoneyBillTransfer } from "react-icons/fa";

const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});

const menuItemsCustomer = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, null),
  getItem("My Accounts", "accounts", <CiWallet />, null),
  getItem("All Transactions", "transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "fixed-deposits", <GiPiggyBank />, null),
  getItem("Loans", "loan", <BankOutlined />, [
    getItem("All Loans", "my-loans", null, null),
    getItem("Request Online Loan", "request-online-loan", null, null),
    getItem("My Loan Applications", "my-loan-applications", null, null),
    getItem("My Pending Installements", "my-pending-installements", null, null),
  ]),
];

const menuItemsEmployee = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "accounts", <CiWallet />, null),
  getItem("Transfer Funds", "transfer-funds", <FaMoneyBillTransfer />, null),
  getItem("All Fixed Deposits", "fixed-deposits", <GiPiggyBank />, null),
  getItem("Loan Management", "loan", <BankOutlined />, [
    getItem("All Active Loans", "active-loans", null, null),
    getItem("Request Offline Loan", "request-offline-loan", null, null),
    getItem("All Loan Applications", "loan-applications", null, null),
    getItem("Pending Installements", "pending-installements", null, null),
  ]),
];

const menuItemsBManager = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "accounts", <CiWallet />, null),
  getItem("Transfer Funds", "transfer-funds", <FaMoneyBillTransfer />, null),
  getItem("All Transactions", "transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "fixed-deposits", <GiPiggyBank />, null),
  getItem("Loan Management", "loan", <BankOutlined />, [
    getItem("All Active Loans", "active-loans", null, null),
    getItem("Request Offline Loan", "request-offline-loan", null, null),
    getItem("All Loan Applications", "loan-applications", null, null),
    getItem("Pending Installements", "pending-installements", null, null),
    getItem("Overdue Installments", "overdue-installements", null, null),
  ]),
];

const menuItemsAdmin = [
  getItem("Dashboard", "dashboard", <HomeOutlined />, null),
  getItem("All Accounts", "accounts", <CiWallet />, null),
  getItem("Transfer Funds", "transfer-funds", <FaMoneyBillTransfer />, null),
  getItem("All Transactions", "transactions", <BsArrowLeftRight />, null),
  getItem("All Fixed Deposits", "fixed-deposits", <GiPiggyBank />, null),
  getItem("Loan Management", "loan", <BankOutlined />, [
    getItem("All Active Loans", "active-loans", null, null),
    getItem("Request Offline Loan", "request-offline-loan", null, null),
    getItem("All Loan Applications", "loan-applications", null, null),
    getItem("Pending Installements", "pending-installements", null, null),
    getItem("Overdue Installments", "overdue-installements", null, null),
  ]),
];

export { menuItemsCustomer, menuItemsEmployee, menuItemsBManager, menuItemsAdmin };