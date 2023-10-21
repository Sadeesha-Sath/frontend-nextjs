import { redirect } from "next/navigation";
import { useEffect } from "react";
import checkToken from "./auth/checkToken";

export default async function Home() {
  useEffect(() => {
    if (checkToken()) {
      redirect("./home/dashboard/");
    } else {
      redirect("./auth/login/");
    }
  }, []);
}
