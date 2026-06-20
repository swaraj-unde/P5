import { Product } from "../../models/product.model.js";

const getFilteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "Fetched The Products",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While fetching The Products",
      error: error.message,
    });
  }
};

export { getFilteredProducts };
