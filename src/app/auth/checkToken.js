import { useUserStore } from "@/store/store";

const checkToken = async () => {
  const localToken = localStorage.getItem("token");
  const storeToken = useUserStore.getState().token;
  if (localToken) {
    const response = await fetchJson("auth/verify");
    if (response.status === "success") {
      // User is logged in
      useUserStore.setState({ user: response.data.user });
      useUserStore.setState({ token: localToken });
      return true;
    }
  }
  if (storeToken) {
    const response = await fetchJson("auth/verify");
    if (response.status === "success") {
      // User is logged in
      useUserStore.setState({ user: response.data.user });
      useUserStore.setState({ token: storeToken });
      return true;
    }
  }
  // User is not logged in
  localStorage.removeItem("token");
  return false;
};

export default checkToken;
