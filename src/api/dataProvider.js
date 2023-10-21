import { redirect } from "next/navigation";
import { useUserStore } from "../store/store";

const fetchJson = async (url, options = {}) => {
  const fullUrl = `${process.env.API_URL}/${url}`;
  console.log(fullUrl);
  if (options.body) {
    if (typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
    }
  }

  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = useUserStore.getState().token;
  options.headers.set("Authorization", `JWT ${token}`);
  options.headers.set("Accept", "application/json, */*");

  try {
    const response = await fetch(fullUrl, options);
    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
};

const loginByEmail = async (email, password, shouldRemember) => {
  useUserStore.setState({ status: "loading" });
  const response = await fetchJson("auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });
  if (response.status === "success") {
    if (shouldRemember) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    useUserStore.setState({
      user: response.data.user,
      token: response.data.token,
      status: "success",
    });
    return response.data;
  }
  return response;
};

const loginByUsername = async (username, password, shouldRemember) => {
  const response = await fetchJson("auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });
  if (response.status === "success") {
    if (shouldRemember) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    useUserStore.setState({
      user: response.data.user,
      token: response.data.token,
      status: "success",
    });

    return response;
  }
  return response;
};

const signup = async (data) => {
  const response = await fetchJson("auth/signup", {
    method: "POST",
    body: data,
  });
  if (response.status === "success") {
    console.log(response);
    return response.data;
    // TODO Make Sure to redirect to login page in the other function
  }
  return response;
};

const addEmployee = async (data) => {
  const response = await fetchJson("employee/new", {
    method: "POST",
    body: data,
  });
  if (response.status === "success") {
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
  if (response.status === "success") {
    console.log(response);
    return response.data;
  }
  return response;
};

export {
  fetchJson,
  loginByEmail,
  loginByUsername,
  signup,
  addEmployee,
  addCustomer,
};