import "./auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div
        style={{
          border: "1px solid #aaa",
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
