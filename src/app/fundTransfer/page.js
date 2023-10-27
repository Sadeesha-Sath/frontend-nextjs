"use client"
import React, { useEffect, useState} from 'react';
import { Button, Form, Input, Select, Typography} from 'antd';
const { Option } = Select;
const { Title, Link } = Typography;
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
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

  
const account_fetch = async () => {
  try {
    const response = await fetch("http://localhost:8080/fundtransfer/accounts");
    const json = await response.json();
    const accounts = json.map(item => ({
      value: item.AccountNo,
      label: item.AccountNo
    }));
    return accounts;

  } catch (error) {
    console.log("error", error);
  }
};



//need to be continued
const userinput_fetch = async (account)=>{
  try {
    const response = await fetch("http://localhost:8080/fundtransfer/proceed", {
      method: 'POST',
      body: JSON.stringify({accountNo: branch}),
      headers: {
        'Content-Type': 'application/json'
      }
      
    });
    const json = await response.json();
    const view = json[0][0].map((item, index) => ({
      key: (index+1).toString(),
      trId: item.TransactionID,
      debAcc: item.DebitedAcc, 
      creAcc: item.CreditedAcc, 
      trnType: item.TrnType, 
      amount: item.Amount,
      debBr: item.DebitedBr,
      creBr: item.CreditedBr

    }));
    return view;

  } catch (error) {
    console.log("error", error);
  }
};



 
const FundTransfer = () => { 
    const [branch, setBranch] = useState(null);
    const [branchList, setBranchList] = useState([]);
    const [account, setAccount] = useState(null);
    const [accountList, setAccountList] = useState([]);

    useEffect(()=>{
        branch_fetch()
          .then((branches)=>{
            setBranchList(branches);
          }).catch((error)=>{
              console.error(error);
          })
      }, [])

      useEffect(()=>{
        account_fetch()
          .then((accounts)=>{
            setAccountList(accounts);
          }).catch((error)=>{
              console.log(error)
          })
      }, [])

        
    const handleClick= async() => {
      if(reportType == 'transaction'){
          const data =await view_fetch(branch);
          setView(data);
          setShowtrTable(true);
      }
      else{
        setShowtrTable(false);
      }

    }

    return(
  <div className='form-container'>

  <Form 
    name="transaction-form"
    onFinish={onFinish}
    labelCol={{
      span: 10,
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      backgroundColor: '#F5F7F8', 
      maxWidth: '500px',
      marginBlock:'10px',
      paddingBlock:'75px',
      paddingInline: '25px',
      borderRadius: '10px',
      border: '0.2px solid grey',
    }}
  >
    <center>
        <Title style={{ marginBottom: "40px" }} level={3}>
          Fund Transfer
        </Title>
      </center> 
    <Form.Item label="Pay From">
      <Form.Item
          name="payeraccount"
          noStyle
          rules={[
            {
              required: true,
              message: 'Payer Account is required',
            },
          ]}
        >
          <Select
        className='select-container'
        onChange = {(value) => setAccount(value)}
        value={account}
        style={{ 
          width: 200
        
        }}
        placeholder="Choose a bank account"
      >
        {accountList.map((option) =>(
          <Select. Option key = {option.value} account = {option.value}>
            {option.label}
          </Select. Option>
        ))}
        
      </Select>
        </Form.Item>
    </Form.Item>
  
    <Form.Item
      label="Payee Account Number"
      style={{
        marginBottom: 0,
        color:"#F4CE14"
      }}
    >
        <Form.Item
          name="payeeaccount"
          rules={[
            {
              required: true,
              message: "Payee account is required"
            }
          ]}
          style={{
            display: 'flex',
            width: '800px'
          }}
        >
          <Input placeholder="Enter Account Number" />
        </Form.Item>
    </Form.Item>

    <Form.Item
      label="Amount"
      style={{
        marginBottom: 0,
      }}
    >
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: "Amount is required to proc"
            }
          ]}
          style={{
            display: 'flex',
            width: '800px',
          }}
        >
          <Input placeholder="Enter the amount" />
        </Form.Item>
    </Form.Item>


    <Form.Item label="Payee Account Branch">
          <Select
        className='select-container'
        value={branch}
        onChange={(value) => setBranch(value)}
        style={{ width: 200 }}
        placeholder="Select a Branch"
      >
        {branchList.map((option) =>(
            <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    
    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit">
        Proceed
      </Button>
    </Form.Item>
  </Form>
  </div>
 
) 
};
export default FundTransfer;