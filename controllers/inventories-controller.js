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

module.exports = {
    getAllInventory,
    getSingleInventoryById,
    getInventoryByWarehouseId,
    deleteInventoryItem
};
