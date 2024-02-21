import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Customer'
  });

  const showSuccessMessage = (message) => {
    toast.success(
      <SuccessMessage>
        <SuccessIcon className="material-icons"></SuccessIcon>
        {message}
      </SuccessMessage>,
      { autoClose: 2000 }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8072/users/register', formData);
      console.log(response.data);
      showSuccessMessage("Record saved successfully!");
      // Handle successful registration, such as displaying a success message or redirecting to login
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, such as displaying an error message to the user
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        
        
          <Label
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Customer">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Owner">Owner</option>
            <option value="Cashier">Cashier</option>
          </Label>
        
        <Button type="submit">Register</Button>
        <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Input = styled.input`
  width: 92%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgb(238, 126, 56);
  border-radius: 5px;
`;

const Label = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgb(238, 126, 56);
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: rgb(238, 126, 56);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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

export default Register;
