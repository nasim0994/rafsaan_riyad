import usePageView from "../../hooks/usePageView";
import Products from "@/components/modules/home/Products";
import Hero from "@/components/modules/home/Hero";
import FlashSale from "@/components/modules/home/FlashSale/FlashSale";
import CampaignBanner from "@/components/modules/home/CampaignBanner";

export default function Home() {
  window.scroll(0, 0);
  usePageView("Home");

  return (
    <>
      <Hero />
      <FlashSale />
      <CampaignBanner />
      <Products />
    </>
  );
}
