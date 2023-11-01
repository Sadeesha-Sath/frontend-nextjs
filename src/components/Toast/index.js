import React from "react";
import { toast } from "react-toastify";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from "react-icons/fa";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message, description = "" }) =>
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 2, fontSize: 15, padding: "8px 3px 8px 12px" }}>
        {message}
      </div>
      <div style={{ flexGrow: 1, fontSize: 13, padding: "8px 12px 8px 3px" }}>
        {description}
      </div>
    </div>
  );

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
