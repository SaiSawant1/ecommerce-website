import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products: products,
  });
};

//create new product
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};

//get product by id /api/v1/products/:id

export const getProductDetail = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product: product });
};

// update a product by id
export const updateProductDetails = async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({ product: product });
};

export const deleteProduct = async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();

  res.status(200).json({ message: "Product deleted" });
};
