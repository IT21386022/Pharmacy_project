import React from "react";
import { MdClose } from "react-icons/md";
import styled from 'styled-components'



const formCustomer = ({
  handleSubmit,
  handleOnChange,
  handleclose,
  rest,
  isSubmitting,
}) => {
  return (
    <AddContainer>
      <FormContainer onSubmit={handleSubmit}>
        <CloseButton onClick={handleclose}>
          <MdClose />
        </CloseButton>

        <FormInputContainer>
          <FormLabels htmlFor="name">Name : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="name"
            name="name"
            onChange={handleOnChange}
            value={rest.name}
            required
            title="Please enter a valid name"
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="address">Address : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="address"
            name="address"
            onChange={handleOnChange}
            value={rest.address}
            required
            title="Please enter a valid email address"
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="phone">Phone Number : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="phone"
            name="phone"
            onChange={handleOnChange}
            value={rest.phone}
            required
            title="Please enter a valid area"
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="medicinedes">Medicine Description : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="medicinedes"
            name="medicinedes"
            onChange={handleOnChange}
            value={rest.medicinedes}
            required
            title="Please enter a valid 10-digit mobile number"
          />
          <br></br>
        </FormInputContainer>

        <FormButton>Submit</FormButton>
      </FormContainer>
    </AddContainer>
  );
};

const AddContainer = styled('div')`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  margin-top: 20px;
`;

const FormContainer = styled('form')`
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  padding-top: auto;
  padding-bottom: 30px;
  padding-right: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const FormLabels = styled('label')`
  font-size: 1rem;
`;

const FormInputs = styled('input')`
  font-size: 1rem;
  padding: 5px 15px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 325px;
  border: 0.2px solid;
`;

const FormSelect = styled("select")`
  font-size: 1rem;
  padding: 5px 15px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 325px;
  border: 0.2px solid;
`;

const FormInputContainer = styled.div`
  position: relative;
`;

const FormButton = styled('button')`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(238, 126, 56);
  color: white;
  font-weight: 500;
  margin-top: 20px;
  width: 325px;
`;

const CloseButton = styled('div')`
  margin-left: auto;
  font-size: 1.2rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #000;
  cursor: pointer;
`;

export default  formCustomer;

