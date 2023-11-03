// "use client";

// import React, { useState, useEffect } from "react";
// import "./style.css";
// import {
//   Form,
//   Input,
//   Button,
//   Typography,
//   Select,
//   Col,
//   Row,
//   Spin,
//   DatePicker,
//   Divider,
//   Rate,
// } from "antd";
// import {
//   UserOutlined,
//   LockOutlined,
//   PhoneOutlined,
//   HomeOutlined,
//   CheckCircleTwoTone,
//   CloseCircleTwoTone,
// } from "@ant-design/icons";
// import { FaRegUserCircle } from "react-icons/fa";
// import { TfiEmail } from "react-icons/tfi";
// import { PiIdentificationCardLight } from "react-icons/pi";
// import { checkNIC, signup, getLoanInterests} from "@/api/dataProvider";
// import { useRouter } from "next/navigation";

// const { Title, Link } = Typography;

// const OffLoanForm = () => {
//   const router = useRouter();
//   const [form] = Form.useForm();
//   const customerType = Form.useWatch("customerType", form);
//   const nic = Form.useWatch("nic", form);
//   const [validUser, setValidUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [interestData, setInterestData] = useState({});
//   const [interest, setInterest] = useState(null);
//   const [loanType, setLoanType] = useState(null);
//   const[interestInfo, setInterestInfo] = useState([]);
//   const [period, setPeriod] = useState(null);
//   const [show, setShow] = useState(false);
//   const [currentDurations, setCurrentDurations] = useState([]);
//   const loanTypes = ['business', 'personal']

//   useEffect(() => {
//     getLoanInterests()
//       .then((rates) => {
//         setInterestData(rates);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const isValidNIC = async (e) => {
//     console.log("Received NIC: " + nic);
//     if (nic) {
//       try {
//         const res = await checkNIC({ nic });
//         if (res.status === 200) {
//           if (res.data.available) {
//             setValidUser(true);
//           } else {
//             setValidUser(false);
//           }
//         } else {
//           console.log(res);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const [date, setDate] = useState(null);
//   const onDatePickerChange = (date, dateString) => {
//     setDate(dateString);
//   };

//   const handleOnFinish = async (values) => {
//     console.log("Received values of form: ", values);
//     if (values.password === values["confirm-pass"]) {
//       setLoading(true);
//       values.dob = date.split("T")[0];
//       let res;
//       try {
//         res = await signup(values);
//         setLoading(false);
//         if (res.status === 200) {
//           router.replace("/auth/login");
//         } else {
//           console.log(res);
//         }
//       } catch (error) {
//         setLoading(false);
//         console.log(error);
//       }
//     } else {
//       console.log("passwords don't match");
//     }
//   };
//   return (
//     <>
//       <center>
//         <Title style={{ marginBottom: "40px" }} level={2}>
//           Welcome to the Future!
//         </Title>
//       </center>
//       <center>
//         <Form
//           form={form}
//           security="true"
//           name="offloan_form"
//           className="offloan-form"
//           initialValues={{
//             customerType: "Individual",
//           }}
//           requiredMark={false}
//           onFinish={handleOnFinish}
//         >
//           <Row gutter={30}>
//             <Col span={11}>
//               <Form.Item
//                 name="nic"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input a Username",
//                   },
//                 ]}
//               >
//                 <Row gutter={2} justify="left" align="middle">
//                   <Col span={validUser !== null ? 14 : 16}>
//                     <Input
//                       prefix={
//                         <FaRegUserCircle className="site-form-item-icon" />
//                       }
//                       placeholder="Username"
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <Button
//                       style={{ maxWidth: "100%" }}
//                       className="nic-check"
//                       onClick={isValidNIC}
//                     >
//                       Check
//                     </Button>
//                   </Col>

//                   {validUser !== null ? (
//                     validUser ? (
//                       <Col span={2}>
//                         <div style={{ minWidth: "100%" }}>
//                           <CheckCircleTwoTone twoToneColor="#2AD24E" />
//                         </div>
//                       </Col>
//                     ) : (
//                       <Col span={2}>
//                         <div style={{ minWidth: "100%" }}>
//                           <CloseCircleTwoTone twoToneColor="#EB2F45" />
//                         </div>
//                       </Col>
//                     )
//                   ) : null}
//                 </Row>
//               </Form.Item>
//               <Form.Item
//                 name="email"
//                 rules={[
//                   {
//                     type: "email",
//                     message: "The input is not valid E-mail!",
//                   },
//                   {
//                     required: true,
//                     message: "Please input your Email",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<TfiEmail className="site-form-item-icon" />}
//                   placeholder="Email"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Password!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<LockOutlined className="site-form-item-icon" />}
//                   type="password"
//                   placeholder="Password"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="confirm-pass"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Confirm your Password!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<LockOutlined className="site-form-item-icon" />}
//                   type="password"
//                   placeholder="Confirm Password"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={2}>
//               <Divider type="vertical" style={{ height: "100%" }} />
//             </Col>
//             <Col span={11}>

//               <Form.Item
//                 name="loanType"
//                 onChange={(value) =>{
//                   setLoanType(value)
//                   console.log(interestInfo);;
//                   console.log("recahed");
//                 }
//                 }
//                 value={loanType}
//                 rules={[{ required: true }]}
//                 label="Loan Type"
//               >
//                 <Select placeholder="Loan Type">
//                     {loanTypes.map((option) => (
//                     <Select.Option key={option} loanType={option}>
//                       {option}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               <Form.Item
//             name="period"
//             label="Period"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               className="select-container"
//               onChange={(value) => setPeriod(value)}
//               value={period}
//               style={{
//                 width: 200,
//               }}
//               placeholder="Choose a Period"
//             >
//               {interestInfo.map((option) => (
//                 <Select.Option key={option.Duration} period={option.Duration} value={option.Duration}>
//                   {`${option.Duration} Months`}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//               <Form.Item
//                 name="phone"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your phone number",
//                   },
//                   {
//                     min: 10,
//                     message: "Please enter a valid phone number",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<PhoneOutlined className="site-form-item-icon" />}
//                   placeholder="Phone Number"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="address"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter your address",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<HomeOutlined className="site-form-item-icon" />}
//                   placeholder="Address"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row>
//             <Col span={10}>
//               <Form.Item style={{ marginBottom: "10px", fontSize: 13 }}>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="signup-form-button"
//                 >
//                   Sign Up
//                 </Button>
//               </Form.Item>
//               <Form.Item style={{ float: "left", marginBottom: 0 }}>
//                 Already a Customer?{" "}
//                 <span style={{ color: "#1777FF" }}>
//                   <Link href="/auth/login">Go to Login</Link>
//                 </span>
//               </Form.Item>
//               <Form.Item>
//                 <Spin spinning={loading} />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </center>
//     </>
//   );
// };

// export default OffLoanForm;

"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Typography, Col, Row } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const { getLoanInterests } = require("@/api/dataProvider");

import { checkNIC, getAccountBasic } from "@/api/dataProvider";
const { Option } = Select;
const { Title, Link } = Typography;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
import "./style.css";
import { forEach, set } from "lodash";

const rates_fetch = async () => {
  try {
    const response = await getLoanInterests();

    // const rates_json = {};
    // json.forEach((element) => {
    //   rates_json[element.Duration] = element.InterestRate;
    // });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

const account_fetch = async () => {
  try {
    const response = await getAccountBasic();
    if (response.status === 200) {
      const accounts = response.data.map((item) => ({
        value: item.AccountNo,
        label: item.AccountNo,
      }));
      return accounts;
    } else {
      console.error(response.data)
    }
  } catch (error) {
    console.log("error", error);
  }
};

const LoanApplication = () => {
  const [form] = Form.useForm();
  const [showRate, setShowRate] = useState(null);
  const [loanType, setLoanType] = useState(null);
  const [interestData, setInterestData] = useState([]);
  const [interestInfo, setInterestInfo] = useState({});
  const [period, setPeriod] = useState([]);
  const [showValues, setShowValues] = useState(false);
  const [rate, setRate] = useState(null);
  const [validUser, setValidUser] = useState(null);

  const loanTypes = ["Business", "Personal"];

  useEffect(() => {
    rates_fetch().then((rates) => {
      let rates_json = {};
      setInterestData({ business: rates.business, personal: rates.personal });
      Object.values(rates).forEach((element) => {
        let temp = {};
        for (const item of element) {
          temp[item.Duration] = item.InterestRate;
        }
        rates_json[element[0].Type.toLowerCase()] = temp;
      });
      setInterestInfo(rates_json);
    });
  }, []);

  useEffect(() => {
    account_fetch()
      .then((accounts) => {
        setAccountList(accounts);
        console.log(accounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isValidNIC = async (e) => {
    console.log("Received NIC: " + nic);
    if (nic) {
      try {
        const res = await checkNIC({ nic });
        if (res.status === 200) {
          if (res.data.available) {
            setValidUser(true);
          } else {
            setValidUser(false);
          }
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const nic = Form.useWatch("nic", form);
  return (
    <div className="form-container">
      <Form
        form={form}
        name="loanApplication-form"
        onFinish={onFinish}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          backgroundColor: "#F5F7F8",
          maxWidth: "500px",
          marginBlock: "10px",
          paddingBlock: "75px",
          paddingInline: "25px",
          borderRadius: "10px",
          border: "0.2px solid grey",
        }}
      >
        <center>
          <Title style={{ marginBottom: "40px" }} level={3}>
            Loan Application
          </Title>
        </center>
        <Form.Item
          label="NIC"
          name="nic"
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="nic"
            rules={[
              {
                required: true,
                message: "NIC is required to proceed",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter the NIC" />
            {validUser !== null ? (
              validUser ? (
                <Col span={2}>
                  <div style={{ minWidth: "100%" }}>
                    <CheckCircleTwoTone twoToneColor="#2AD24E" />
                  </div>
                </Col>
              ) : (
                <Col span={2}>
                  <div style={{ minWidth: "100%" }}>
                    <CloseCircleTwoTone twoToneColor="#EB2F45" />
                  </div>
                </Col>
              )
            ) : null}

            <Button
              style={{ maxWidth: "100%" }}
              className="nic-check"
              onClick={isValidNIC}
            >
              Check
            </Button>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Loan Type">
          <Form.Item
            name="loanType"
            noStyle
            rules={[
              {
                required: true,
                message: "Loan Type is required",
              },
            ]}
          >
            <Select
              className="select-container"
              onChange={(value) => {
                setLoanType(value);
                setShowValues(true);
                console.log(interestInfo);
                setRate(interestInfo[value.toLowerCase()][period]);
                console.log(interestInfo[value.toLowerCase()][period]);
                setShowRate(false);
              }}
              value={loanType}
              style={{
                width: 200,
              }}
              placeholder="Choose a loan type"
            >
              {loanTypes.map((option) => (
                <Select.Option key={option.toLowerCase()} loanType={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Duration">
          <Form.Item
            name="duration"
            noStyle
            rules={[
              {
                required: true,
                message: "Period Type is required",
              },
            ]}
          >
            <Select
              className="select-container"
              onChange={(value) => {
                setPeriod(value);
                setRate(interestInfo[loanType][value]);
                setShowRate(true);
              }}
              value={period}
              style={{
                width: 200,
              }}
              placeholder="Choose a period"
            >
              {showValues &&
                interestData[loanType].map((option) => (
                  <Select.Option key={option.Duration} period={option.Duration}>
                    {`${option.Duration} months`}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form.Item>

        {showRate && (
          <Form.Item
            label="Interest Rate"
            style={{ color: "Red", fontWeight: "bold" }}
          >
            {(rate * 100).toFixed(2)}%
          </Form.Item>
        )}

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
                message: "Amount is required to proceed",
              },
            ]}
            style={{
              display: "flex",
              width: "800px",
            }}
          >
            <Input placeholder="Enter the amount" />
          </Form.Item>
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Proceed
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoanApplication;
