"use client"; // Error components must be Client Components

import { Button, Result } from "antd";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Result
        status="error"
        title="Some Error Occured"
        subTitle="Sorry, there was some unexpected Error."
        extra={[
          <Button key={"try-again"} onClick={() => reset()}>
            Try Again
          </Button>,
          <Button key="go-back" type="primary">
            Go Back
          </Button>,
        ]}
      />
    </div>
  );
}
