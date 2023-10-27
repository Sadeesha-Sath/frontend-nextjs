"use client";
import { useRouter } from "next/navigation";
import { Space, Spin, Flex } from "antd";
import checkToken from "./auth/checkToken";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const verifyToken = async () => {
    const isTokenVerified = await checkToken(window, true);
    if (isTokenVerified) {
      router.replace("/home/dashboard/");
    } else {
      router.replace("/auth/login/");
    }
  };
  useEffect(() => {
    console.log("Use Effect FROM MAIN PAGE Firing");
    verifyToken();
  }, []);
  return (
    <center>
      <Flex gap="middle" vertical>
        <Space size="large" />
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
        <Space size="large" />
      </Flex>
    </center>
  );
}
