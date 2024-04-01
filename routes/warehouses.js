const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid')

const warehouseController = require('../controllers/warehouses-controllers');


router.route('/')
  .post(warehouseController.postNewWarehouse)
  // .patch(warehouseController.editWarehouse)

router.route('/:id')
  .patch(warehouseController.editWarehouse)
  .get(warehouseController.getSingleWarehouseById)

router
  .route('/:id')



  

module.exports = router;