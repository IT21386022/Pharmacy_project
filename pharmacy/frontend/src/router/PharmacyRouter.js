import React from "react";
import { Routes, Route } from "react-router-dom";

import Customer from "../pages/Customer";
import Medication from "../pages/Medication";
import Login from "../pages/Login";
import MCustomer from "../pages/MCustomer";
import MMedication from "../pages/MMedication";
import CCustomer from "../pages/CCustomer";
import CMedication from "../pages/CMedication";
import Cashier from "../pages/Cashier";
import Manager from "../pages/Manager";
import Owner from "../pages/Owner";
import Register from "../pages/Register";

export default function PharmacyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/customer" element={<Customer />}/>
      <Route path="/medication" element={<Medication/>}/>
      <Route path="/mcustomer" element={<MCustomer/>}/>
      <Route path="/mmedication" element={<MMedication/>}/>
      <Route path="/ccustomer" element={<CCustomer/>}/>
      <Route path="/cmedication" element={<CMedication/>}/>
      <Route path="/cashier" element={<Cashier/>}/>
      <Route path="/manager" element={<Manager/>}/>
      <Route path="/owner" element={<Owner/>}/>

    </Routes>
  );
}