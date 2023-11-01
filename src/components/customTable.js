"use client";
import { Table } from "antd";
import { useState, useEffect } from "react";

const CustomTable = ({ columns, dataMethod, rowKey, initData = {} }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [tableParams, setTableParams] = useState({
    ...initData,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    console.log(tableParams);
    setLoading(true);
    const response = await dataMethod(tableParams);
    if (response.status === 200) {
      setData(response.data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.length,
        },
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      recordKey={rowKey}
      dataSource={data}
      loading={loading}
      pagination={tableParams.pagination}
      scroll={{ x: "max-content"}}
      onChange={handleTableChange}
    />
  );
};

export default CustomTable;
