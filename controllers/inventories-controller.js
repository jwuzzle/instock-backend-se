const knex = require("knex")(require("../knexfile"));

const getAllInventory = async (_req, res) => {
    try {
        const data = await knex("inventories");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Users: ${err}`);
    }
};

const getSingleInventoryById = async (req, res) => {
    try {
        const data = await knex("inventories").where({ id: req.params.id }).first();
        if (!data) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Users: ${err}`);
    }
};

const getInventoryByWarehouseId = async (req, res) => {
    try {
        const data = await knex("inventories").where({ warehouse_id: req.params.id });
        if (data.length === 0) {
            return res.status(404).json({
                message: `Warehouse with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Users: ${err}`);
    }
}

const deleteInventoryItem = async (req, res) => {
    try {
        const rowsDeleted = await knex("inventories")
            .where({ id: req.params.id })
            .delete();

        if (rowsDeleted === 0) {
            return res
                .status(404)
                .json({ message: `Item with ID ${req.params.id} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete Item: ${error}`
        });
    }
};


const editInventory= async (req, res) => {
    try {
      const inventoryRowUpdated = await knex("inventories")
        .where({ id: req.params.id })
        .update(req.body);
  
      if (inventoryRowUpdated === 0) {
        return res.status(404).json({
          message: `Inventory with ID ${req.params.id} not found`
        });
      }
  
      const updatedInventory = await knex("inventories")
        .where({ id: req.params.id, });
        res.json(updatedInventory[0]);
  
    } catch (error) {
      res.status(500).json({
        message: `Unable to update inventory with ID ${req.params.id}: ${error}`
      });
    }
  };

const postInventoryItem = async (req, res) => {
    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity || !req.body.warehouse_id) {
        return res.status(400).json({
            message: "Please provide all required information for the new inventory item in the request",
        });
    }

    try {
        const newItem = await knex("inventories").insert(req.body);
        const newInventoryId = newItem[0];
        const createdInventory = await knex("inventories").where({ id: newInventoryId });

        res.status(201).json(createdInventory);
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new inventory item`
        })
    }
};


module.exports = {
    getAllInventory,
    getSingleInventoryById,
    getInventoryByWarehouseId,
    deleteInventoryItem,
    editInventory,
    postInventoryItem
};
