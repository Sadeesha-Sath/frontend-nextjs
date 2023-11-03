import Image from "next/image";
import "./auth.css";
import logo from "@assets/logo3.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div style={{ position: "absolute", left: 15, top: 30 }}>
        <Image src={logo} alt="Logo" height={150} width={150} />
      </div>
      <div className="auth-layout">
        <div
          style={{
            boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0",
            padding: "50px",
            borderRadius: 30,
            backgroundColor: "#F5F7F8",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
