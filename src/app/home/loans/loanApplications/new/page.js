"use client";

import usePermissions from "@/app/auth/permissions/permissions";
import "./styles.css";
import { useUserStore } from "@/store/store";
import OfflineApplication from "./offlineApplication";
import OnlineApplication from "./onlineApplication";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AddLoanApplication = () => {
  const offline_permission = usePermissions("OFFLINE_LOAN_APPLICATION");
  const online_permission = usePermissions("ONLINE_LOAN_APPLICATION");
  const router = useRouter();
  useEffect(() => {
    if (!offline_permission && !online_permission) {
      router.replace("/home/unauthorized");
    }
  }, []);
  return (
    <>
      {offline_permission ? (
        <OfflineApplication />
      ) : online_permission ? (
        <OnlineApplication />
      ) : (
        <></>
      )}
    </>
  );
};
export default AddLoanApplication;
