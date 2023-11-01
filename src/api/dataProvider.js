import { useUserStore } from "@/store/store";
import apiConfig from "@/constants/config";
import { stringify } from "qs";

const fetchJson = async (url, options = {}) => {
  const fullUrl = `${apiConfig.baseUrl}/${url}`;
  console.log(fullUrl);
  if (options.body) {
    if (typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
    }
  }

  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json",
      ...apiConfig.headers,
    });
  }

  const token = useUserStore.getState().token;
  // console.log("Token is " + token);
  if (token) {
    options.headers.set("Authorization", `JWT ${token}`);
    options.headers.set("Accept", "application/json, */*");
  }

  try {
    // console.log("fetching");
    const response = await fetch(fullUrl, options);
    return { status: response.status, data: await response.json() };
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
};

const verifyToken = async (token) => {
  const response = await fetchJson("auth/verify", {
    method: "POST",
    body: { token },
  });
  return response;
};

const loginByEmail = async (email, password) => {
  const response = await fetchJson("auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });
  return response;
};

const loginByUsername = async (username, password) => {
  const response = await fetchJson("auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });
  return response;
};

const signup = async (data) => {
  const response = await fetchJson("auth/signup", {
    method: "POST",
    body: data,
  });
  return response;
};

const checkUsername = async (data) => {
  const response = await fetchJson("auth/checkUsername", {
    method: "POST",
    body: data,
  });
  return response;
};

const checkNIC = async (data) => {
  const response = await fetchJson("auth/checkNic", {
    method: "POST",
    body: data,
  });
  return response;
};

const addEmployee = async (data) => {
  const response = await fetchJson("employees/new", {
    method: "POST",
    body: data,
  });
  return response;
};

const addCustomer = async (data) => {
  const response = await fetchJson("customers/new", {
    method: "POST",
    body: data,
  });
  return response;
};

const getAllAccounts = async (data) => {
  console.log(data);
  const queryParams = stringify(data);
  console.log(`accounts?${queryParams}`);
  const response = await fetchJson(`accounts?${queryParams}`, {
    method: "GET",
  });
  response.data = response.data.map((item) => ({
    ...item,
    accountType: item.SavingsPlanType === null ? "Current" : "Savings",
    key: item.AccountNumber,
  }));
  return response;
};

const getMyAccounts = async (data) => {
  console.log(data);
  const queryParams = stringify(data);
  console.log(queryParams);
  const response = await fetchJson(`accounts/my?${queryParams}`, {
    method: "GET",
  });
  return response;
};

const getBranchDetailsMinimal = async () => {
  const queryParams = stringify({ level: "minimal" });
  const response = await fetchJson(`branches?${queryParams}`, {
    method: "GET",
  });
  console.log(response);
  return response;
};

const getCustomers = async () => {
  const response = await fetchJson(`customers`, {
    method: "GET",
  });
  return response;
};

const getUsers = async () => {
  const response = await fetchJson("users", {
    method: "GET",
  });
  return response;
};

const getEmployees = async () => {
  const response = await fetchJson("employees", {
    method: "GET",
  });
  return response;
};

const getFD = async () => {
  const response = await fetchJson("fixed-deposits", {
    method: "GET",
  });
  return response;
};

const getMyFD = async () => {
  const response = await fetchJson("fixed-deposits/my", {
    method: "GET",
  });
  return response;
};

const getLoans = async () => {
  const response = await fetchJson("loans", {
    method: "GET",
  });
  return response;
};

const getActiveLoans = async () => {
  const response = await fetchJson("loans/active", {
    method: "GET",
  });
  return response;
};

const getBranches = async () => {
  const response = await fetchJson("branches", {
    method: "GET",
  });
  return response;
};

const getAllTransactions = async () => {
  const response = await fetchJson("transactions", {
    method: "GET",
  });
  return response;
};

const getAllLoanApplications = async (branchID) => {
  const queryParams = stringify({ branchID });
  const response = await fetchJson(`loanApplications/?${queryParams}`, {
    method: "GET",
  });
  return response;
};

const getPendingLoanApplications = async (branchID) => {
  const queryParams = stringify({ branchID });
  const response = await fetchJson(`loanApplications/pending/?${queryParams}`, {
    method: "GET",
  });
  return response;
};

const getAllLoanInstallments = async (branchID) => {
  const queryParams = stringify({ branchID });
  const response = await fetchJson(`installments/?${queryParams}`, {
    method: "GET",
  });
  return response;
};

const addTransaction = async (data) => {
  const response = await fetchJson("transactions/add", {
    method: "POST",
    body: data,
  });
  return response;
};

const approveLoanApplication = async (id) => {
  const response = await fetchJson("loanApplications/approve", {
    method: "POST",
    body: { id },
  });
  return response;
};

const rejectLoanApplication = async (id) => {
  const response = await fetchJson("loanApplications/reject", {
    method: "POST",
    body: { id },
  });
  return response;
};

export {
  loginByEmail,
  loginByUsername,
  signup,
  addEmployee,
  addCustomer,
  verifyToken,
  checkUsername,
  getAllAccounts,
  getMyAccounts,
  getBranchDetailsMinimal,
  getCustomers,
  getUsers,
  getEmployees,
  getFD,
  getMyFD,
  getLoans,
  getActiveLoans,
  getBranches,
  checkNIC,
  getAllTransactions,
  getAllLoanApplications,
  getAllLoanInstallments,
  getPendingLoanApplications,
  addTransaction,
  approveLoanApplication,
  rejectLoanApplication,
};
