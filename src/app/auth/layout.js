import "./auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div
        style={{
          boxShadow:" 0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E0E0E0",
          padding: "50px",
          borderRadius: 30,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
