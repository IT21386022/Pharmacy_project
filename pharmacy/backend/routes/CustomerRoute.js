const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.route("/create").post(customerController.createNewCustomer);
router.route("/:id").get(customerController.getSingleCustomer);
router.route("/").get(customerController.getAllCustomers);
router.route("/update").put(customerController.updateCustomer);
router.route("/delete/:id").delete(customerController.deleteCustomer);
router.delete("/softdelete/:id", customerController.softDeleteCustomer);


module.exports = router;
