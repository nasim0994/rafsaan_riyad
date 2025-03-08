const mongoose = require("mongoose");

const heroCampaignBannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const HeroCampaignBanner = mongoose.model(
  "HeroCampaignBanner",
  heroCampaignBannerSchema
);

module.exports = HeroCampaignBanner;
