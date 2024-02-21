// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';



const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8072/users/login', formData);
    const token = response.data.token;
    
    // Decode the JWT token to extract user data
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Redirect logic based on user role
    switch (userRole) {
      case 'Owner':
        window.location.href = '/owner'; // Redirect to owner page
        break;
      case 'Manager':
        window.location.href = '/manager'; // Redirect to manager page
        break;
      case 'Cashier':
        window.location.href = '/cashier'; // Redirect to cashier page
        break;
      default:
        console.log('Unknown role');
        break;
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <Button type="submit">Login</Button>
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

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: rgb(238, 126, 56);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


export default Login;
