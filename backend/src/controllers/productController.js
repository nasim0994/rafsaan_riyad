const Product = require("../models/productModel");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");
const slugify = require("slugify");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addProduct = async (req, res) => {
  const thumbnail = req?.files?.thumbnail[0]?.filename;
  const galleries = req.files.gallery ? req.files.gallery : [];

  if (!thumbnail) {
    return res.json({
      success: false,
      message: "Please upload thumbnail",
    });
  }

  const { title } = req?.body;

  let product = {
    ...req?.body,
    slug: slugify(`${title}`),
    thumbnail,
  };

  if (galleries?.length > 0) {
    product.galleries = galleries?.map((gallery) => ({
      url: gallery.filename,
      name: gallery.originalname,
    }));
  }

  try {
    const result = await Product.create(product);
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });

    fs.unlink(`./uploads/products/${thumbnail}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    if (galleries?.length > 0) {
      galleries?.forEach((gallery) => {
        fs.unlink(`./uploads/products/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const {
    category,
    subCategory,
    subSubCategory,
    range,
    sort: priceSort,
    search,
    status,
  } = req.query;

  try {
    const targetedCategory = await Categories.findOne({
      slug: category && category,
    });
    const targetedSubCategory = await SubCategory.findOne({
      slug: subCategory && subCategory,
    });
    const targetedSubSubCategory = await SubSubCategory.findOne({
      slug: subSubCategory && subSubCategory,
    });

    const categoryId = targetedCategory?._id;
    const subCategoryId = targetedSubCategory?._id;
    const subSubCategoryId = targetedSubSubCategory?._id;

    let query = {};
    if (category) query.category = categoryId;
    if (subCategory) query.subCategory = subCategoryId;
    if (subSubCategory) query.subSubCategory = subSubCategoryId;
    if (status === "all") {
      query;
    } else if (status == "active") {
      query.status = true;
    } else if (status == "inactive") {
      query.status = false;
    } else {
      query.status = true;
    }

    const prices = range && JSON.parse(range);
    let sortOption = {};

    if (priceSort && parseInt(priceSort) !== 0) {
      sortOption.sellingPrice = parseInt(priceSort);
    } else {
      sortOption.createdAt = -1;
    }

    if (range) query.sellingPrice = { $gte: prices[0], $lte: prices[1] };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .populate("category subCategory subSubCategory", "name slug icon");

    const total = await Product.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const result = await Product.findById(req?.params?.id).populate(
      "category subCategory subSubCategory"
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const result = await Product.findOne({ slug: req?.params?.slug }).populate(
      "category subCategory subSubCategory",
      "name slug icon"
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Product delete failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

    // delete thumbnail image
    const thumbnail = product?.thumbnail;
    const fullPath = `./uploads/products/${thumbnail}`;

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    if (product?.galleries?.length > 0) {
      product?.galleries?.map((gallery) => {
        fs.unlink(`./uploads/products/${gallery?.url}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req?.params?.id;
  const thumbnail = req?.files?.thumbnail && req?.files?.thumbnail[0]?.filename;
  const galleries = req.files.gallery ? req.files.gallery : [];

  const { title, galleriesUrl } = req?.body;

  try {
    const isExit = await Product.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    let product = {
      ...req?.body,
      slug: slugify(`${title}`),
      thumbnail: thumbnail || isExit?.thumbnail,
    };

    let newImages = [];

    if (galleries?.length > 0) {
      const newImage = galleries?.map((gallery) => ({
        url: gallery.filename,
        name: gallery.originalname,
      }));

      newImages.push(...newImages, ...newImage);
    }

    if (isExit?.galleries) {
      const filterImages = isExit?.galleries?.filter((gallery) =>
        galleriesUrl?.includes(gallery?.url)
      );

      newImages = [...filterImages, ...newImages];
    }

    product.galleries = newImages;

    if (newImages?.length > 10) {
      if (galleries?.length > 0) {
        galleries?.forEach((gallery) => {
          fs.unlink(`./uploads/products/${gallery?.filename}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      }

      return res.json({
        success: false,
        message: "You can't upload more than 10 images",
      });
    }

    // update
    const result = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!result) {
      return res.json({
        success: false,
        message: "Product update failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });

    if (galleriesUrl && isExit?.galleries) {
      const deletedImages = isExit?.galleries?.filter(
        (gallery) => !galleriesUrl?.includes(gallery?.url)
      );

      deletedImages?.forEach((image) => {
        fs.unlink(`./uploads/products/${image?.url}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }

    if (!galleriesUrl && isExit?.galleries?.length > 0) {
      isExit?.galleries?.forEach((image) => {
        fs.unlink(`./uploads/products/${image?.url}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }

    // delete previous thumbnail image
    if (thumbnail) {
      const fullPath = `./uploads/products/${isExit?.thumbnail}`;
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });

    if (thumbnail) {
      fs.unlink(`./uploads/products/${thumbnail}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (galleries?.length > 0) {
      galleries?.map((gallery) => {
        fs.unlink(`./uploads/products/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndUpdate(id, { status: !product.status });

    res.status(200).json({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.son({
      success: false,
      message: error.message,
    });
  }
};
