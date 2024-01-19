const express = require("express");
const router = express.Router();
const Cart = require("../Models/cart");
const Product = require("../Models/product");
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./Public/Images");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// Ruta za dodavanje u košaricu
router.post("/cart", async (req, res) => {
  try {
    const { userId, productId, productName, productPrice, image, quantity } =
      req.body;
    console.log(image);

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Provjerite je li košarica već stvorena za korisnika
    let cart = await Cart.findOne({ userId });

    // Ako ne postoji, stvorite novu košaricu
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Provjerite postoji li proizvod već u košarici
    const existingProduct = cart.products.find((product) =>
      product.productId.equals(productId)
    );

    // Ako postoji, povećajte količinu
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      // Inače, dodajte novi proizvod u košaricu
      cart.products.push({
        productId,
        productName,
        quantity,
        productPrice,
        image,
      });
    }

    const products = cart.products; // Declare products here

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const product of products) {
      const totalForProduct = product.productPrice * product.quantity;
      product.productTotal = totalForProduct;

      totalPrice += totalForProduct;
      totalQuantity += product.quantity;
    }
    console.log(totalPrice);

    //console.log(totalPrice);

    cart.totalPrice = totalPrice;
    cart.totalQuantity = totalQuantity;

    // Spremite promjene u bazu podataka
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, error: "Error adding to cart" });
  }
  // Logika dodavanja u košaricu
});

// Ruta za prikaz košarice
router.get("/cart/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Pronađite košaricu za određenog korisnika
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    const products = cart.products; // Declare products here

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const product of products) {
      const totalForProduct = product.productPrice * product.quantity;
      product.productTotal = totalForProduct;

      totalPrice += totalForProduct;
      totalQuantity += product.quantity;
    }
    console.log(totalPrice);

    //console.log(totalPrice);

    cart.totalPrice = totalPrice;
    cart.totalQuantity = totalQuantity;

    // Spremite promjene u bazu podataka
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, error: "Error fetching cart" });
  }
});

// Dodajte ostale rute vezane uz košaricu

module.exports = router;
