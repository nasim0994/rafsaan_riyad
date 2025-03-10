const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const category = require("./categoriesRoutes");
const subCategory = require("./subCategoriesRoutes");
const subSubCategory = require("./subSubCategoriesRoutes");

const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const logoRouter = require("./logoRoutes");
const faviconRouter = require("./faviconRoutes");
const contactRouter = require("./contactRoutes");
const bannerRouter = require("./bannerRoutes");
const heroCampaignBanner = require("./heroCampaignBannerRoutes");
const topCampaignBannerRouter = require("./TopCampaignBannerRoutes");

const aboutRouter = require("./aboutRoutes");

const productRouter = require("./productRoutes");
const flashDealRouter = require("./flashDealRoutes");

const seoRouter = require("./seoRoutes");

// General
const businessInfoRoutes = require("./businessInfoRoutes");

const orderRouter = require("./orderRoutes");
const paymentRouter = require("./paymentRoute");

const privacy = require("./privacyRoute");
const termcondition = require("./termconditionRoute");
const returnPolicy = require("./returnPolicyRoute");
const faq = require("./faqRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------

router.use("/category", category);
router.use("/subCategory", subCategory);
router.use("/subSubCategory", subSubCategory);

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/logo", logoRouter);
router.use("/favicon", faviconRouter);
router.use("/contact", contactRouter);
router.use("/about", aboutRouter);

router.use("/product", productRouter);
router.use("/flash-deal", flashDealRouter);

router.use("/banner", bannerRouter);
router.use("/heroCampaignBanner", heroCampaignBanner);
router.use("/topCampaignBanner", topCampaignBannerRouter);

router.use("/seo", seoRouter);

router.use("/privacy", privacy);
router.use("/terms-condition", termcondition);
router.use("/return-policy", returnPolicy);

//------General
router.use("/businessInfo", businessInfoRoutes);

router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/faq", faq);

module.exports = router;
