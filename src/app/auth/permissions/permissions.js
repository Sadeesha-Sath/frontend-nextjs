const { useUserStore } = require("@/store/store");

const permissions = {
  admin: ["SET_BRANCH_MANAGER", "OFFLINE_LOAN_APPLICATION"],
  b_manager: ["VERITY_LOAN_APPLICATIONS", "OFFLINE_LOAN_APPLICATION"],
  employee: ["OFFLINE_LOAN_APPLICATION"],
  customer: ["ONLINE_LOAN_APPLICATION"],
};

const usePermissions = (permission) => {
  const user = useUserStore((state) => state.user);
  return permissions[user?.Role].includes(permission);
};

export default usePermissions;
