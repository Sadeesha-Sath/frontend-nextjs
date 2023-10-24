"use client";
import { menuItemsAdmin, menuItemsBManager } from "@/constants/menuItems";
import { useUserStore } from "@/store/store";
import { Menu, Layout, Typography, Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import checkToken from "../auth/checkToken";

const { Title } = Typography;

const { Header, Footer, Content, Sider } = Layout;

const HomeLayout = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  const verifyToken = async () => {
    const isTokenVerified = await checkToken(window);
    if (isTokenVerified) {
      user ? console.log(user) : console.log("No user");
    } else {
      router.replace("/auth/login/");
    }
  };
  useEffect(() => {
    console.log("User Effect FROM LAYOUT Firing");
    verifyToken();
  }, []);
  return (
    <>
      {user ? (
        <Layout
          className="home-layout"
          style={{ minHeight: "100vh", background: "#FAFAFA" }}
        >
          <Header
            className="header"
            style={{
              marginBottom: "2px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#FAFAFA",
              border: "1px solid #EAEAEA",
              // padding: "0 1.5rem",
            }}
          >
            <Title level={2} style={{ color: "#1E334F", marginBottom: 0 }}>
              A Bank
            </Title>
            <Button
              type="primary"
              onClick={() => {
                localStorage.removeItem("token");
                logout();
                router.replace("/auth/login");
              }}
            >
              Log Out
            </Button>
          </Header>
          <Layout style={{ minHeight: "85vh", background: "#FAFAFA" }}>
            <Sider
              className="main-nav"
              width={256}
              style={{ background: "#FAFAFA", borderRadius: 20 }}
            >
              <Menu
                defaultSelectedKeys={["dashboard"]}
                onClick={(e) => console.log(e)}
                style={{
                  width: 256,
                  position: "relative",
                  backgroundColor: "#FAFAFA",
                  top: 0,
                  left: 0,
                  borderRadius: 20,
                }}
                mode="vertical"
                items={
                  user.Role === "admin"
                    ? menuItemsAdmin
                    : user.Role === "b_manager"
                    ? menuItemsBManager
                    : user.Role === "employee"
                    ? menuItemsEmployee
                    : menuItemsCustomer
                }
              />
            </Sider>
            <Content
              className="main-content"
              style={{
                marginTop: "4px",
                marginInline: "6px",
                position: "relative",
                backgroundColor: "#EAEAEA",
                padding: "1rem",
                minHeight: "75vh",
                borderRadius: 20,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
};

export default HomeLayout;
