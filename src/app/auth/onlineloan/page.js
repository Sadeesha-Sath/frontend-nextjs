"use client";

//import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import "./prop.css";
import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, 
         Radio, Select, Slider, Switch, TreeSelect, Upload, } from 'antd';
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  return (
    <>
      <center>
      </center>
      <Form
        security="true"
        name="login_form"
        className="login-form"
      >
        <Form.Item label="Account No">
          <InputNumber style={{float: "right",width: "175px"}}/>
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber style={{float: "right",width: "175px"}}/>
        </Form.Item>

        <Form.Item label="Loan type" >
            <div style={{float: "right",width: "150px"}}>
          <Select >
            <Select.Option value="Business">Business</Select.Option>
            <Select.Option value="Personal">Personal</Select.Option>
          </Select>
            </div>
        </Form.Item>
       
        
        <Form.Item label="Period">
          <InputNumber style={{float: "right"}} />
        </Form.Item>
        
        <Form.Item>
            <Checkbox
              checked={componentDisabled}
              onChange={(e) => setComponentDisabled(e.target.checked)}
            >
              I here by agree to the terms and conditions
            </Checkbox>
        </Form.Item>

        <Form.Item >
          <Button disabled = {!componentDisabled}>Submit</Button>
        </Form.Item>
        
      </Form>
      
    </>
  );
};
export default () => <FormDisabledDemo />;