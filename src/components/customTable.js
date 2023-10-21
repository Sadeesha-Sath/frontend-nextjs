import { Table } from "antd";
import { useState , useEffect} from "react";

const CustomTable = ({ columns, dataMethod, key }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        }
    });

    const fetchData = async () => {
        setLoading(true);
        const response = await dataMethod(tableParams);
        if (response.status === "success") {
            setData(response.data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: response.data.length,
                }
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
            recordKey={key}
            dataSource={data}
            loading={loading}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
        />
    );
};

export default CustomTable;