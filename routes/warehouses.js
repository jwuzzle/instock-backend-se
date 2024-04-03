const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const warehouseController = require("../controllers/warehouses-controllers");

router.route("/").post(warehouseController.postNewWarehouse);

router.route('/')
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.postNewWarehouse)
// .patch(warehouseController.editWarehouse)

router.route('/:id')
  .patch(warehouseController.editWarehouse)
  .get(warehouseController.getSingleWarehouseById)
  .delete(warehouseController.deleteWarehouse)

module.exports = router;
