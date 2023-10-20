"use client"
import React, { useEffect, useState} from 'react';
import { Select, Input, Form, Button, Table} from 'antd';
import "./style.css" 


  const branch_fetch = async () => {
      try {
        const response = await fetch("http://localhost:8080/branches");
        const json = await response.json();
        const branches = json.map(item => ({
          value: item.BranchID,
          label: item.BranchName
        }));
        return branches;

      } catch (error) {
        console.log("error", error);
      }
    };

  const view_fetch = async ()=>{
    try {
      const response = await fetch("http://localhost:8080/view");
      const json = await response.json();
      console.log(json);
      const view = json.map((item, index) => ({
        accnum: item.AccountNo,
        count: item.Count, 
        key: (index+1).toString()
      }));
      return view;

    } catch (error) {
      console.log("error", error);
    }
  };
  
const Report = () => {
  const [reportType, setReportType] = useState(null);
  const [branch, setBranch] = useState(null);
  const [showtrTable, setShowtrTable] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [view, setView] = useState([]);
  const reports = [
    { value: 'transaction', label: 'Total Transaction' },
    { value: 'loan', label: 'Late Loan Installment' },
    // Add more options as needed
  ];


  useEffect(()=>{
    branch_fetch()
      .then((branches)=>{
        setBranchList(branches);
      }).catch((error)=>{
          console.error(error);
      })
  }, [])

  //response must be mapped to the branches
  
  
const columns = [
  {
    title: "Account Number",
    dataIndex: "accnum",
    key: "accnum",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
  },
];


  const handleClick= async() => {
    if(reportType == 'transaction' && branch =='B001'){
        console.log("Reached");
        const data =await view_fetch();
        setView(data);
        setShowtrTable(true);
    }
    else{
      setShowtrTable(false);
    }

  }
  return (
    <>
    <div></div>
    <div className = "centered-container">
      <div className="title-container"><h2>Reports</h2></div>
      <div className='input-container'>
      <Select
        className='select-container'
        value={reportType}
        onChange={(value) => setReportType(value)}
        style={{ width: 200 }}
        placeholder="Select Report Type"
      >
        {reports.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        className='select-container'
        value={branch}
        onChange={(value) => setBranch(value)}
        style={{ width: 200 }}
        placeholder="Select a Branch"
      >
        {branchList.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>

        ))}
      </Select>
      

    <Button type="primary" htmlType="submit" onClick={handleClick} className="generate-button">Generate</Button>
    </div>
    {showtrTable && (
      <Table className='table-container'
        dataSource={view}
        columns={columns}
        bordered
      />
    
    )}
    
    </div>
    
    </>
   
    
  )
 
      }

export default Report;




