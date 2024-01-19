const router = require("express").Router();
const Product = require("../Models/product");
const CartProduct = require("../Models/cart");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/Images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { name, brand, price, description } = req.body;
  const { filename } = req.file;

  try {
    const product = await Product.create({
      image: filename,
      name,
      brand,
      price,
      description,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);

    const cartProduct = await CartProduct.updateMany(
      { "products.productId": productId },
      { $pull: { products: { productId: productId } } }
    );

    if (!product || !cartProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/product/", upload.single("file"), async (req, res) => {
  const { name, brand, price, description, file } = req.body;
  //const { file } = req.file;
  console.log(name, brand, price, description, file);
});

module.exports = router;
