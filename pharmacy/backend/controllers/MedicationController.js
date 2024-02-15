const Medication = require("../models/Medication");
const session = require("express-session");
const medicationModel = require("../models/Medication")

//@desc Get all medications
//@route GET /medication
//@access Private
const getAllMedications = async (req, res) => {
  try {
    const medication = await Medication.find();
    console.log(medication);
    if (!medication) {
      return res.status(400).json({ message: "No medications found" });
    }

    res.json(medication);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Create new customer
//@route POST /customer
//@access Private
const createNewMedication = async (req, res) => {
  try {
    const { name, description, quantity,volume } = req.body;

    console.log("data >>>", name, description, quantity,volume);

    //confirm data
    if (!name || !description || !quantity || !volume) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const medicationObject = {
      name,
      description,
      quantity,
      volume,
    };
    console.log("in side medication controller >>", medicationObject);

    //create and store new medication

    const medication = await Medication.create(medicationObject);

    if (medication) {
      //created
      res.status(201).json({ message: `New medication created` });
    } else {
      res.status(400).json({ message: "Invalid medication data received" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleMedication = async (req, res) => {
  let medicationID = req.params.id;
  try {
    // const userID = req.session.userID;
    if (!medicationID) {
      return res.json({ message: "MedicationID undefined" });
    }

    const medication = await Medication.findById(medicationID);

    if (!medication) {
      return res.json({ message: "Medication not found" });
    }

    res.status(200).json({ medication: medication });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//@desc Update a customer
//@route PATCH /customer
//@access Private
const updateMedication = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;

    // Check if _id exists
    if (!_id) {
      return res.status(400).json({ message: "No medication id" });
    }

    // Update the customer
    const updatedMedication = await medicationModel.findByIdAndUpdate(_id, rest, { new: true });

    // Check if customer was found and updated
    if (!updatedMedication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    // Send success response
    res.json({ message: "Medication details updated.", medication: updatedMedication });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteMedication = async (req, res) => {
  try {
    let medicationID = req.params.id;
    await Medication.findByIdAndDelete(medicationID)
      .then(() => {
        res.status(200).json({ message: "Medication deleted" });
      })
      .catch((error) => {
        res.json({
          message: "Error with delete medication",
          error: error.message,
        });
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const softDeleteMedication = async (req, res) => {
  try {
    const medicationID = req.params.id;

    // Find the medication by ID
    const medication = await Medication.findById(medicationID);

    // Check if the medication exists
    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    // Set the 'deleted' flag to true
    medication.deleted = true;

    // Save the updated medication to mark it as deleted
    await medication.save();

    // Send success response
    res.json({ message: "Medication soft deleted.", medication });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
   getAllMedications,
   createNewMedication,
   getSingleMedication,
   updateMedication,
   deleteMedication,
   softDeleteMedication,
}