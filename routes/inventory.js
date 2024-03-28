const express = require("express");
const router = express.Router();

const inventoryController = require('../controllers/inventories-controller');

router
    .route('/')
    .get(inventoryController.getAllInventory);


router
    .route('/:id')
    .get(inventoryController.getSingleInventoryById)
    .delete(inventoryController.deleteInventoryItem);


router
    .route('/warehouse/:id')
    .get(inventoryController.getInventoryByWarehouseId);


module.exports = router;