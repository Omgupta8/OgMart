import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    // req.fields used in formidable
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
    } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();
    // console.log(product);

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Server Error" });
  }
};

// LEARN ABOUT REGEX AND OPTIONS
const fetchProducts = async (req, res) => {
  try {
    // along with pagination
    const pageSize = 6;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // console.log(req.query);

    // console.log(keyword);

    // const Products = await Product.find({});

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    return res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const fetchProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.json("Product not found");
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json({
      message: "All the Products",
      data: Products,
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // console.log(product.reviews);
      // console.log(req);

      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added", data: review });
    } else {
      res.status(404).json("Product already found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const fetchTopProducts = async (req, res) => {
  try {
    const product = await Product.find({})
      .sort({ rating: -1 })
      .sort({ price: -1 })
      .limit(4);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const fetchNewProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);

    res.json(products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
