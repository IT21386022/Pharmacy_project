const Customer = require("../models/Customer");
const session = require("express-session");
const customerModel = require("../models/Customer")

//@desc Get all customers
//@route GET /customer
//@access Private
const getAllCustomers = async (req, res) => {
  try {
    const customer = await Customer.find();
    console.log(customer);
    if (!customer) {
      return res.status(400).json({ message: "No customers found" });
    }

    res.json(customer);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Create new customer
//@route POST /customer
//@access Private
const createNewCustomer = async (req, res) => {
  try {
    const { name, address, phone, medicinedes } = req.body;

    console.log("data >>>", name, address, phone, medicinedes);

    //confirm data
    if (!name || !address || !phone || !medicinedes ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const customerObject = {
      name,
      address,
      phone,
      medicinedes,
    };
    console.log("in side customer controller >>", customerObject);

    //create and store new customer

    const customer = await Customer.create(customerObject);

    if (customer) {
      //created
      res.status(201).json({ message: `New customer created` });
    } else {
      res.status(400).json({ message: "Invalid customer data received" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleCustomer = async (req, res) => {
  let customerID = req.params.id;
  try {
    // const userID = req.session.userID;
    if (!customerID) {
      return res.json({ message: "CustomerID undefined" });
    }

    const customer = await Customer.findById(customerID);

    if (!customer) {
      return res.json({ message: "Customer not found" });
    }

    res.status(200).json({ customer: customer });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Update a customer
//@route PATCH /customer
//@access Private
const updateCustomer = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;

    // Check if _id exists
    if (!_id) {
      return res.status(400).json({ message: "No customer id" });
    }

    // Update the customer
    const updatedCustomer = await customerModel.findByIdAndUpdate(_id, rest, { new: true });

    // Check if customer was found and updated
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Send success response
    res.json({ message: "Customer details updated.", customer: updatedCustomer });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteCustomer = async (req, res) => {
  try {
    let customerID = req.params.id;
    await Customer.findByIdAndDelete(customerID)
      .then(() => {
        res.status(200).json({ message: "Customer deleted" });
      })
      .catch((error) => {
        res.json({
          message: "Error with delete customer",
          error: error.message,
        });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const softDeleteCustomer = async (req, res) => {
  try {
    const customerID = req.params.id;

    // Find the customer by ID
    const customer = await Customer.findById(customerID);

    // Check if the customer exists
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Set the 'deleted' flag to true
    customer.deleted = true;

    // Save the updated customer to mark it as deleted
    await customer.save();

    // Send success response
    res.json({ message: "Customer soft deleted.", customer });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSingleCustomer,
  softDeleteCustomer,
};