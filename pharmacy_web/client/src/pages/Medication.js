import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GolfCourseSharpIcon from "@mui/icons-material/GolfCourseSharp";
import { Paper, TableContainer } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Formtable from "../components/formMedication";
import styled from "styled-components";

const Medication = ({ userRole }) => {
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
        <AddButton onClick={() => setAddSection(true)}>
          Add Medication
        </AddButton>
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
                {dataList.map((medication) => (
                  <tr key={medication.id}>
                    <TableBodyTd>{medication.name}</TableBodyTd>
                    <TableBodyTd>{medication.description}</TableBodyTd>
                    <TableBodyTd>{medication.volume}</TableBodyTd>
                    <TableBodyTd>{medication.quantity}</TableBodyTd>
                    <TableBodyTd>
                      {!medication.isDeleted ? (
                        <>
                          <BtnEdit onClick={() => handleEdit(medication)}>
                            <EditIcon />
                          </BtnEdit>
                          <BtnDelete onClick={() => handleDelete(medication.id)}>
                            <DeleteIcon />
                          </BtnDelete>
                          <BtnDelete onClick={() => handleSoftDelete(medication.id)}>
                            <GolfCourseSharpIcon />
                          </BtnDelete>
                        </>
                      ) : (
                        <BtnEdit onClick={() => handleRestore(medication.id)}>
                          Restore
                        </BtnEdit>
                      )}
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
  background: rgb(238, 126, 126);
  color: white;
`;

const ContainerForTable = styled("div")`
  margin-top: 20px;
`;

const TableHeadTr = styled("tr")`
  background-color: #f2f2f2;
`;

const TableHeadTableRowTableHead = styled("th")`
  padding: 12px;
  text-align: left;
`;

const TableBodyTd = styled("td")`
  padding: 8px;
`;

const BtnEdit = styled("button")`
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;

const BtnDelete = styled("button")`
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;

export default Medication;
