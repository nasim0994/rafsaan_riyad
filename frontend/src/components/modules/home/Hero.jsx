import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useGetBannersQuery } from "@/Redux/banner/bannerApi";
import BannerSkeleton from "@/components/shared/Skeleton/BannerSkeleton";
import HeroCampaign from "./HeroCampaign";

export default function Hero() {
  const { data, isLoading, isError } = useGetBannersQuery();

  let content = null;

  if (isLoading) content = <BannerSkeleton />;
  if (!isLoading && !isError) {
    content = data?.data?.map((banner) => (
      <SwiperSlide key={banner._id}>
        <Link to={banner?.link}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/banner/${banner?.image}`}
            alt="banner"
            className="h-full w-full rounded"
            loading="lazy"
          />
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <section className="pt-1 sm:pt-2">
      <div className="container">
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-7 md:items-start md:gap-2">
          <div className="h-40 sm:h-72 md:col-span-5 md:h-[300px] lg:h-[400px]">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="h-full w-full object-cover"
            >
              {content}
            </Swiper>
          </div>

          <HeroCampaign />
        </div>
      </div>
    </section>
  );
}
