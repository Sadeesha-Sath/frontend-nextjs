"use client"
import React, { useState } from "react";
import { Table, Button } from "antd";

const columns = [
  {
    title: "Column 1",
    dataIndex: "column1",
    key: "column1",
  },
  {
    title: "Column 2",
    dataIndex: "column2",
    key: "column2",
  },
];

const data = [
  {
    column1: "Value 1",
    column2: "Value 2",
  },
  {
    column1: "Value 3",
    column2: "Value 4",
  },
];

const TableWithButton = () => {
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(true);
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Show Table
      </Button>
      {showTable && (
        <Table
          dataSource={data}
          columns={columns}
          bordered
        />
      )}
    </div>
  );
};

export default TableWithButton;