const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addCampaignBanner,
  getCampaignBanners,
  deleteCampaignBanner,
  updateCampaignBanner,
  getCampaignBannerById,
} = require("../controllers/heroCampaignBannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/herocampaignBanner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.post("/add", verifyAdmin, upload, addCampaignBanner);
router.get("/all", getCampaignBanners);
router.get("/single/:id", verifyAdmin, getCampaignBannerById);
router.patch("/edit/:id", verifyAdmin, upload, updateCampaignBanner);
router.delete("/delete/:id", verifyAdmin, deleteCampaignBanner);

module.exports = router;
