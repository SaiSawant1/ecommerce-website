import Product from "../models/product.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import APIFilters from "../utils/apiFilters.js";
import { previousDay } from "date-fns";

export const getProducts = catchAsyncError(async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductCount,
    products,
  });
});

//create new product
export const newProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(200).json({ product });
});

//get product by id /api/v1/products/:id

export const getProductDetail = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product: product });
});

// update a product by id
export const updateProductDetails = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({ product: product });
});

export const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();

  res.status(200).json({ message: "Product deleted" });
});

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = { user: req?.user?._id, rating: Number(rating), comment };

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString(),
  );

  if (isReviewed) {
    product?.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ sucess: true });
});

export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ reviews: product.reviews });
});

export const deleteProductReview = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.query.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.user.toString() !== req?.query?._id.toString(),
  );

  const numOfReviews = reviews.length;

  const rating =
    numOfReviews === 0
      ? 0
      : reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    { new: true },
  );

  res.status(200).json({ sucess: true, product });
});
