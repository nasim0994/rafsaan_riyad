import Spinner from "@/components/shared/Spinner/Spinner";
import { useGetHeroCampaignBannersQuery } from "@/Redux/heroCampaignBanner/heroCampaignBannerApi";

export default function HeroCampaign() {
  const { data, isLoading } = useGetHeroCampaignBannersQuery();
  const banners = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <div className="flex gap-2 md:col-span-2 md:flex-col">
      {banners?.slice(0, 2)?.map((banner) => (
        <img
          key={banner?._id}
          src={`${
            import.meta.env.VITE_BACKEND_URL
          }/herocampaignBanner/${banner?.image}`}
          alt="banner"
          className="h-20 w-[49.5%] rounded object-cover sm:h-32 md:h-[146px] md:w-full lg:h-[196px]"
        />
      ))}
    </div>
  );
}
