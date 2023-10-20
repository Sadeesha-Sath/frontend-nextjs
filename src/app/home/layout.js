import { menuItemsAdmin, menuItemsBManager } from "@/constants/menuItems";
import { useUserStore } from "@/store/store";
import { Menu, Layout, Typography, Button } from "antd";
import { redirect } from "next/navigation";

const { Title } = Typography;

const { Header, Footer, Content, Sider } = Layout;

const HomeLayout = ({ children }) => {
  const user = useUserStore((state) => state.user);
  let menuItems;
  if (user.role === "admin") {
    menuItems = menuItemsAdmin;
  } else if (user.role === "b_manager") {
    menuItems = menuItemsBManager;
  } else if (user.role === "employee") {
    menuItems = menuItemsEmployee;
  } else {
    menuItems = menuItemsCustomer;
  }
  const setToken = useUserStore((state) => state.setToken);
  return (
    <Layout className="home-layout">
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        <Title level={2} style={{ color: "#1E334F" }}>
          A Bank
        </Title>
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
            redirect("/auth/login");
          }}
        >
          Log Out
        </Button>
      </Header>
      <Layout style={{ padding: "1.5rem 0" }}>
        <Sider className="main-nav">
          <Menu
            onClick={onClick}
            style={{
              width: 256,
              position: "relative",
              top: 0,
              left: 0,
            }}
            mode="vertical"
            items={menuItems}
          />
        </Sider>
        <Content className="main-content">{children}</Content>
      </Layout>
      <Footer className="Footer"></Footer>
    </Layout>
  );
};

export default HomeLayout;
