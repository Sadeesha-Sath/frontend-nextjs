"use client";
import { verifyToken } from "@/api/dataProvider";
import { useUserStore } from "@/store/store";

const checkToken = async (window, shouldSetUser = false) => {
  if (window !== undefined) {
    const storeToken = useUserStore.getState().token;
    console.log("Store Token is " + storeToken);
    if (storeToken) {
      const response = await verifyToken(storeToken);
      if (response.status === 200) {
        // User is logged in
        if (shouldSetUser) {
          useUserStore.setState({ user: response.data.user });
          useUserStore.setState({ token: storeToken });
        }
        return true;
      }
    }
    const localToken = window.localStorage.getItem("token");
    console.log(" Local Token is " + localToken);
    if (localToken) {
      const response = await verifyToken(localToken);
      console.log(response.status);
      if (response.status === 200) {
        // User is logged in
        useUserStore.setState({ user: response.data.user });
        useUserStore.setState({ token: localToken });
        return true;
      }
    }
    // User is not logged in
    window.localStorage.removeItem("token");
    return false;
  }
};

export default checkToken;
