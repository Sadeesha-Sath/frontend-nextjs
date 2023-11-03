"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
const { getCustomers } = require("@/api/dataProvider");

const SingleCustomer = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getCustomers();
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const customerData = data.find(
    (customer) => customer.CustomerID === Number(params.customerID)
  );

  if (!customerData) {
    return <p>Customer not found</p>;
  }

  return (
    <div className="single-customer">
      <div className="customer-data">
        <label>Customer ID:</label>
        <input type="text" value={customerData.CustomerID} readOnly />

        <label>Name:</label>
        <input type="text" value={customerData.Name} readOnly />

        <label>User Name:</label>
        <input type="text" value={customerData.Username} readOnly />

        <label>Email:</label>
        <input type="text" value={customerData.Email} readOnly />

        <label>CustomerType:</label>
        <input type="text" value={customerData.CustomerType} readOnly />

        <label>NIC / BR:</label>
        <input type="text" value={customerData.NIC_BR} readOnly />

        <label>Phone:</label>
        <input type="text" value={customerData.Phone} readOnly />

        <label>Address:</label>
        <input type="text" value={customerData.Address} readOnly />

        <label>Date of Birth:</label>
        <input type="text" value={customerData.DOB} readOnly />

        <label>Role:</label>
        <input type="text" value={customerData.Role} readOnly />
        
        <label>UserID:</label>
        <input type="text" value={customerData.UserID} readOnly />
      </div>
    </div>
  );
};

export default SingleCustomer;
