const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const warehouseRoutes = require("./routes/warehouses");
const inventoryRoutes = require("./routes/inventory");

//port
const PORT = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());

//basic routes for the APIs
app.use("/warehouses", warehouseRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/", (_req, res) => {
   res.status(200).json({
      "project name": "Instock",
      description: "Group Project",
      createdBy: "the best team in whole of SOHO NYC",
   });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
