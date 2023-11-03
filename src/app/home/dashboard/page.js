"use client";

import { Typography } from "antd";
import Image from "next/image";
const { Title } = Typography;
import workInProgress from "@/assets/work-in-progress_2.jpg";

export default function Dashboard() {
  return (
    <>
      <div style={{ maxHeight: "80vh" }}>
        <Title level={1}>Dashboard</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Image
            src={workInProgress}
            alt="Work In Progress"
            height={500}
            // width={400}
          />
        </div>
      </div>
    </>
  );
}
