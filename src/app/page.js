import { useUserStore } from "@/store/store";
import { redirect } from "next/navigation";


export default async function Home() {
    // Check if User Token is Valid
    const localToken = localStorage.getItem("token");
    const storeToken = useUserStore((state) => state.token);
    if (localToken) {
        const response = await fetchJson("auth/verify");
        if (response.status === "success") {
            // User is logged in
            useUserStore.setState({ user: response.data.user });
            useUserStore.setState({ token: localToken });
            return redirect("/home/dashboard");
        }
    }
    if (storeToken) {
      const response = await fetchJson("auth/verify");
      if (response.status === "success") {
        // User is logged in
        useUserStore.setState({ user: response.data.user });
        useUserStore.setState({ token: storeToken });
        return redirect("/home/dashboard");
      }
    }
    // User is not logged in
    localStorage.removeItem("token");
  return redirect("/auth/login");
}