import React from 'react'
import styled from "styled-components";

const Owner = () => {
  return (
    <div>
      <center><h1>Welcome To Owner Dashboard</h1></center>
        <center><a href="/customer"><AddButton1>Go to Customer</AddButton1></a></center>
        <br></br>
        <center><a href="/medication"><AddButton2>Go to Medication</AddButton2></a></center>
    </div>
  )
}

const AddButton1 = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(238, 126, 56);
  color: white;
  padding: 24px 24px 24px 24px;
  margin-top: 50px;
  width: 500px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
  }
`;

const AddButton2 = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(238, 126, 56);
  color: white;
  padding: 24px 24px 24px 24px;
  width: 500px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
  }
`;

export default Owner
