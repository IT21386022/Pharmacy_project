import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GolfCourseSharpIcon from '@mui/icons-material/GolfCourseSharp';
import { Paper, TableContainer } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Formtable from "../components/formMedication";
import styled from "styled-components";

const CMedication = ({ userRole }) => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    volume: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    description: "",
    quantity: "",
    volume: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getFetchData();
  }, [isSubmitting]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showSuccessMessage = (message) => {
    toast.success(message, { autoClose: 2000 });
  };

  const getFetchData = async () => {
    try {
      const medications = await axios.get("http://localhost:5000/getMedication");
      setDataList(medications.data.medications);
    } catch (error) {
      console.error("Error fetching medication data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/addMedication", formData);
      setAddSection(false);
      setFormData({
        name: "",
        description: "",
        quantity: "",
        volume: "",
      });
      showSuccessMessage("Record saved successfully!");
    } catch (error) {
      console.error("Error adding medication:", error);
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/softdeleteMedication/${id}`);
      showSuccessMessage("Record soft deleted successfully!");
    } catch (error) {
      console.error("Error soft deleting medication:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteMedication/${id}`);
      showSuccessMessage("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restoreMedication/${id}`);
      showSuccessMessage("Record restored successfully!");
    } catch (error) {
      console.error("Error restoring medication:", error);
    }
  };

  const handleEdit = (medication) => {
    setFormDataEdit({ ...medication });
    setEditSection(true);
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/updateMedications/${formDataEdit._id}`,
        formDataEdit
      );
      getFetchData();
      setEditSection(false);
      showSuccessMessage("Record updated successfully!");
    } catch (error) {
      console.error("Error updating medication:", error);
    }
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
        <h1>Medication Management</h1>
      </center>
      <ContainerDiv>
        <br />
        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
            isSubmitting={isSubmitting}
            
          />
        )}

        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <ContainerForTable>
          <TableContainer component={Paper}>
            <table>
              <thead>
                <TableHeadTr>
                  <TableHeadTableRowTableHead>Name</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>Description</TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Volume
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Quantity
                  </TableHeadTableRowTableHead>
                  <TableHeadTableRowTableHead>
                    Actions
                  </TableHeadTableRowTableHead>
                </TableHeadTr>
              </thead>
              <tbody>
                {dataList.map((customer) => (
                <tr key={customer._id}>
                    <TableBodyTd>{customer.name}</TableBodyTd>
                    <TableBodyTd>{customer.description}</TableBodyTd>
                    <TableBodyTd>{customer.volume}</TableBodyTd>
                    <TableBodyTd>{customer.quantity}</TableBodyTd>
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
  /* background-color: red; */
  max-width: 1200px;
  /* margin: 50px auto; */
  margin: 25px auto;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const AddButton = styled("button")`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(238, 126, 56);
  color: white;
  padding: 24px 24px 24px 24px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    width: 100%; // Make it full-width on smaller screens
    margin-left: 0; // Remove left margin on smaller screens
  }
`;

const ContainerForTable = styled("div")`
  margin-top: 50px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  // Media query for smaller screens
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const TableHeadTr = styled("tr")`
  /* background-color: rgb(238, 126, 56); */
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

const BtnDelete = styled("button")`
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

export default CMedication;
