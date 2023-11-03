"use client";
import {
  menuItemsAdmin,
  menuItemsBManager,
  menuItemsEmployee,
  menuItemsCustomer,
} from "@/constants/menuItems";
import { useUserStore } from "@/store/store";
import { Menu, Layout, Typography, Button, Spin, Image } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import checkToken from "../auth/checkToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const path = usePathname();
  console.log(path);
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
            <Image
              src="https://img.freepik.com/free-photo/beautiful-bouquet-baby-s-breath-flowers-with-white-heart-shape-pink-background_23-2147940349.jpg?w=1060&t=st=1698986531~exp=1698987131~hmac=99037f6492543351e5b4dacd0a8449c487b373e392dc9026380d3a56ea83b690"
              alt="Logo"
              height={100}
              width={100}
            />
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
          <Layout hasSider style={{ minHeight: "85vh", background: "#FAFAFA" }}>
            <Sider
              className="main-nav"
              width={256}
              style={{
                background: "#FAFAFA",
                borderRadius: 20,
                overflow: "auto",
                height: "85vh",
              }}
            >
              <Menu
                defaultSelectedKeys={["dashboard"]}
                onClick={(e) => {
                  console.log(e.key);
                  if (e.key !== path) {
                    console.log("Changing Route");
                    router.push(e.key);
                  }
                }}
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
                padding: "20px",
                minHeight: "75vh",
                borderRadius: 20,
              }}
            >
              {children}
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
              />
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
