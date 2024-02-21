import EditIcon from "@mui/icons-material/Edit";
import { Paper, TableContainer } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const CCustomer = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    medicinedes: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    address: "",
    phone: "",
    medicinedes: "",
    id: "", // Changed from _id
  });

  const [dataList, setDataList] = useState([]);
  console.log("check state array >>>", dataList);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showSuccessMessage = (message) => {
    toast.success(
      <SuccessMessage>
        <SuccessIcon className="material-icons"></SuccessIcon>
        {message}
      </SuccessMessage>,
      { autoClose: 2000 }
    );
  };

  const getFetchData = async () => {
    try {
      const customers = await axios.get("http://localhost:5000/getCustomer");
      setDataList(customers.data.customers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/addCustomer",
        formData
      );
      console.log(response.data);
      setFormData({
        name: "",
        address: "",
        phone: "",
        medicinedes: "",
      });
      showSuccessMessage("Record saved successfully!");
      getFetchData();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [isSubmitting]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteCustomer/${id}`);
      showSuccessMessage("Record deleted successfully!");
      getFetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/softdeleteCustomer/${id}`);
      showSuccessMessage("Record soft deleted successfully!");
      getFetchData();
    } catch (error) {
      console.error("Error soft deleting record:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restoreCustomer/${id}`);
      showSuccessMessage("Record restored successfully!");
      getFetchData();
    } catch (error) {
      console.error("Error restoring record:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formDataEdit);
    try {
      await axios.put(
        `http://localhost:5000/updateCustomer/${formDataEdit.id}`,
        formDataEdit
      );
      getFetchData();
      setAddSection(false);
      setEditSection(false);
      showSuccessMessage("Record updated successfully!");
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (customer) => {
    setFormDataEdit({ ...customer });
    setEditSection(true);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <center>
        <h1>Customer Management</h1>
      </center>
      <ContainerDiv>
        <br />
        <ContainerForTable>
          <TableContainer component={Paper}>
            <table>
              <thead>
                <TableHeadTr>
                  <TableHeadTableRowTableHead>Name</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Address</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Phone Number</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Medicine Description</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Actions</TableHeadTableRowTableHead>
                </TableHeadTr>
              </thead>
              <tbody>
                {dataList.map((customer) => (
                  <tr key={customer._id}>
                    <TableBodyTd>{customer.name}</TableBodyTd>
                    <TableBodyTd>{customer.address}</TableBodyTd>
                    <TableBodyTd>{customer.phone}</TableBodyTd>
                    <TableBodyTd>{customer.medicinedes}</TableBodyTd>
                    <TableBodyTd>
                      <BtnEdit onClick={() => handleEdit(customer)}>
                            <EditIcon />
                      </BtnEdit>
                    </TableBodyTd>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </ContainerForTable>
      </ContainerDiv>
    </>
  );
};

const ContainerDiv = styled("div")`
  padding: 10px;
  max-width: 1200px;
  margin: 25px auto;
`;

const ContainerForTable = styled("div")`
  margin-top: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const TableHeadTr = styled("tr")`
  border: 1px solid rgb(238, 126, 56);
`;

const TableHeadTableRowTableHead = styled("th")`
  min-width: 200px;
  border: 1px solid rgb(238, 126, 56);
  padding: 15px;
  border-radius: 0;
  font-weight: 18px;
  color: rgb(238, 126, 56);
  justify-content: center;
  align-content: center;
`;

const TableBodyTd = styled("td")`
  min-width: 200px;
  padding: 7px;
  border: 1px solid rgb(238, 126, 56);
  border-radius: 5px;
  justify-content: center;
  align-content: center;
`;

const BtnEdit = styled("button")`
  font-size: 16px;
  padding: 5px 10px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(238, 126, 56);
`;

const SuccessMessage = styled("div")`
  display: flex;
  align-items: center;
  color: #28a745;
`;

const SuccessIcon = styled("span")`
  font-size: 24px;
  margin-right: 10px;
`;

export default CCustomer;
