"use client"
import React, { useEffect, useState} from 'react';
import { Select, Input, Form, Button, Table} from 'antd';
import "./style.css" 


  const branch_fetch = async () => {
      try {
        const response = await fetch("http://localhost:8080/report/branches");
        const json = await response.json();
        const branches = json[0].map(item => ({
          value: item.BranchID,
          label: item.BranchName
        }));
        return branches;

      } catch (error) {
        console.log("error", error);
      }
    };

  const view_fetch = async (branch, reportType)=>{
    try {
      const response = await fetch("http://localhost:8080/report/view", {
        method: 'POST',
        body: JSON.stringify({brId: branch, reportType}),
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      const json = await response.json();
      let view;
      if (reportType == 'transaction'){
        view = json[0][0].map((item, index) => ({
        key: (index+1).toString(),
        trId: item.TransactionID,
        debAcc: item.DebitedAcc, 
        creAcc: item.CreditedAcc, 
        trnType: item.TrnType, 
        amount: item.Amount,
        debBr: item.DebitedBr,
        creBr: item.CreditedBr

      }))} else if (reportType == 'loan'){
          view = json[0][0].map((item, index) => ({
          key: (index+1).toString(),
          loanId: item.LoanID,
          cusID: item.CustomerID, 
          payDate: item.PaymentDate,
          dueDate: item.DueDate 
        }))
      };
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
  const [columns, setColumns] = useState([]);
  const reports = [
    { value: 'transaction', label: 'Total Transaction' },
    { value: 'loan', label: 'Late Loan Installment' },
  ];

  const column = {
    transaction: [
      
        {
          title: "Transaction ID",
          dataIndex: "trId",
          key: "trId",
        },
        {
          title: "Debited Account",
          dataIndex: "debAcc",
          key: "debAcc",
        },
        {
          title: "Credited Account",
          dataIndex: "creAcc",
          key: "creAcc",
        },
        {
          title: "Transaction Type",
          dataIndex: "trnType",
          key: "trnType",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Debited Branch",
          dataIndex: "debBr",
          key: "debBr",
        },
        {
          title: "Credited Branch",
          dataIndex: "creBr",
          key: "creBr",
        }
      
    ], 
      loan: [
        {
          title: "Loan ID",
          dataIndex: "loanId",
          key: "loanId",
        },
        {
          title: "Customer ID",
          dataIndex: "cusID",
          key: "cusID",
        },
        {
          title: "Payment Date",
          dataIndex: "payDate",
          key: "payDate",
        },
        {
          title: "Due Date",
          dataIndex: "dueDate",
          key: "dueDate",
        }
      ] 
    
  }


  useEffect(()=>{
    branch_fetch()
      .then((branches)=>{
        setBranchList(branches);
      }).catch((error)=>{
          console.error(error);
      })
  }, [])



  const handleClick= async() => {
    if(reportType){
        const data =await view_fetch(branch, reportType);
        setView(data);
        setShowtrTable(true);
        setColumns(column[reportType])
    // } else if(reportType == 'loan'){
    //   const data =await view_fetch(branch, reportType);
    //   setView(data);
    //   setShowtrTable(true);
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




