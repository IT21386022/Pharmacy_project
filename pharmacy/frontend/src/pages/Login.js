import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAuthenticated: false // Flag to track authentication status
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the entered username and password
    const { username, password } = formData;

    // Check user role based on username and password
    if (username === 'owner' && password === 'owner123') {
      setFormData({ ...formData, isAuthenticated: true }); // Set authentication flag
      navigate('/owner');
    } else if (username === 'manager' && password === 'manager123') {
      setFormData({ ...formData, isAuthenticated: true }); // Set authentication flag
      navigate('/manager');
    } else if (username === 'cashier' && password === 'cashier123') {
      setFormData({ ...formData, isAuthenticated: true }); // Set authentication flag
      navigate('/cashier');
    } else {
      // Invalid credentials, handle error or show error message
      console.error('Invalid username or password');
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
