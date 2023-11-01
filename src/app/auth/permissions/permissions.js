const { useUserStore } = require("@/store/store");

const permissions = {
  admin: [],
  b_manager: ["VERITY_LOAN_APPLICATIONS"],
  employee: [],
  customer: [],
};

const usePermissions = (permission) => {
  const user = useUserStore((state) => state.user);
  return permissions[user?.Role].includes(permission);
};

export default usePermissions;
