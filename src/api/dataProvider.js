import { useUserStore } from "@/store/store";
import apiConfig from "@/constants/config";

const fetchJson = async (url, options = {}) => {
  const fullUrl = `${apiConfig.baseUrl}/${url}`;
  // console.log(fullUrl);
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

const addEmployee = async (data) => {
  const response = await fetchJson("employee/new", {
    method: "POST",
    body: data,
  });
  if (response.status === 200) {
    console.log(response);
    return response.data;
  }
  return response;
};

const addCustomer = async (data) => {
  const response = await fetchJson("customer/new", {
    method: "POST",
    body: data,
  });
  if (response.status === 200) {
    console.log(response);
    return response.data;
  }
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
};
