const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const warehouseController = require("../controllers/warehouses-controllers");

router.route("/").post(warehouseController.postNewWarehouse);

router.route("/").get(warehouseController.getAllWarehouses);

module.exports = router;
