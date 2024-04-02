const knex = require("knex")(require("../knexfile"));

const postNewWarehouse = async (req, res) => {
   console.log(req.body);

   if (
      !req.body.warehouse_name ||
      !req.body.address ||
      !req.body.city ||
      !req.body.country ||
      !req.body.contact_name ||
      !req.body.contact_position ||
      !req.body.contact_phone ||
      !req.body.contact_email
   ) {
      return res.status(400).json({
         message: "Please provide all required values",
      });
   }

   try {
      const result = await knex("warehouses").insert(req.body);
      const newWarehouseId = result[0];
      const createdWarehouse = await knex("warehouses").where({
         id: newWarehouseId,
      });

      res.status(201).json(createdWarehouse);
   } catch (error) {
      res.status(500).json({
         message: `Unable to create new warehouse: ${error}`,
      });
   }
};

const getAllWarehouses = async (req, res) => {
   try {
      const data = await knex("warehouses");
      res.status(200).json(data);
   } catch (err) {
      res.status(400).send(`Error retrieving Warehouses: ${err}`);
   }
};

const editWarehouse = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found` 
      });
    }

    const updatedWarehouse = await knex("warehouses")
      .where({
        id: req.params.id,
      });
    
    res.json(updatedWarehouse[0]);

  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}` 
    });
  }
};

const getSingleWarehouseById = async (req, res) => {
  try {
    const data = await knex("warehouses").where({ id: req.params.id }).first();
    if (!data) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouse: ${err}`);
  }
};

module.exports = {
  postNewWarehouse,
  editWarehouse,
  getSingleWarehouseById
};
