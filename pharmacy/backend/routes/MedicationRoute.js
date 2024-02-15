const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/MedicationController");

router.route("/").get(medicationController.getAllMedications);
router.route("/create").post(medicationController.createNewMedication);
router.route("/:id").get(medicationController.getSingleMedication);
router.route("/update").put(medicationController.updateMedication);
router.route("/delete/:id").delete(medicationController.deleteMedication);
router.delete("/softdelete/:id", medicationController.softDeleteMedication);

module.exports = router;