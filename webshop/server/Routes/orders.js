const express = require("express");
const router = express.Router();

// Ruta za stvaranje narudžbe
router.post("/orders", (req, res) => {
  // Logika stvaranja narudžbe
});

// Ruta za prikaz svih narudžbi
router.get("/orders", (req, res) => {
  // Logika prikaza svih narudžbi
});

// Dodajte ostale rute vezane uz narudžbe

module.exports = router;
