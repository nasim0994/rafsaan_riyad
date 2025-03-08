import { CgMenuLeftAlt } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { useSelector } from "react-redux";
import { useGetMainLogoQuery } from "@/Redux/logo/logoApi";
import { useState } from "react";
import HeaderMobileSidebar from "./HeaderMobileSidebar";
import IHeart from "../../icons/IHeart";

export default function MainHeader() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  const { data: logoData, isLoading } = useGetMainLogoQuery();
  const logo = logoData?.data && logoData?.data[0]?.logo;

  const { wishlists } = useSelector((state) => state.wishlist);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    if (search) {
      navigate(`/shops?search=${search}`);
      e.target.search.value = "";
    }
  };

  return (
    <section className="py-3 shadow">
      <div className="container">
        <div className="flex w-full items-center justify-between">
          {/* category */}
          <div className="category hidden items-center gap-2 lg:flex lg:w-2/5">
            {categories?.slice(0, 5)?.map((category) => (
              <Link
                key={category?._id}
                to={`/shops?category=${category?.slug}`}
              >
                {category?.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 lg:w-1/5">
            <div className="lg:hidden">
              <button onClick={() => setShowSidebar(true)}>
                <CgMenuLeftAlt className="text-2xl" />
              </button>

              <HeaderMobileSidebar
                setShowSidebar={setShowSidebar}
                categories={categories}
                showSidebar={showSidebar}
              />
            </div>

            <Link to="/">
              {isLoading ? (
                <img
                  src="/images/logo.png"
                  alt="logo"
                  width={200}
                  height={60}
                  className="w-40 lg:w-52"
                />
              ) : (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo}`}
                  alt="logo"
                  width={200}
                  height={60}
                  className="w-40 lg:w-52"
                />
              )}
            </Link>
          </div>

          {/* buttons */}
          <div className="flex items-center justify-end gap-3 text-neutral-content sm:gap-5 lg:w-2/5">
            <Search />

            <Link to="/wishlist" className="relative">
              <IHeart width={25} height={25} />
              {wishlists.length > 0 && (
                <span className="absolute -right-3 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-base-100">
                  {wishlists?.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              name="search"
              placeholder="search for styles, collections & more"
              className="w-full pl-9"
            />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral opacity-50">
              <BiSearch className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
