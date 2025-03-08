import { useGetProductBySlugQuery } from "@/Redux/product/productApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import SimilarProducts from "@/components/shared/main/ProductDetails/SimilarProducts";
import BreadcrumbCom from "@/components/shared/main/ProductDetails/BreadcrumbCom";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/Redux/wishlist/wishlistSlice";

export default function ProductDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const { data, isLoading } = useGetProductBySlugQuery(slug);
  const product = data?.data;
  const discount = sessionStorage.getItem("discount");
  const [showImage, setShowImage] = useState(product?.thumbnail);

  console.log(product?.sellingPrice);

  useEffect(() => {
    setShowImage(product?.thumbnail);
  }, [product]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-2">
      <div className="container">
        <BreadcrumbCom title={product?.title} />

        <div className="mt-4 grid gap-10 lg:grid-cols-5">
          {/* left-images */}
          <div className="grid gap-3 md:grid-cols-7 md:gap-4 lg:col-span-3">
            <div className="order-2 flex gap-2 md:order-1 md:flex-col md:gap-3">
              {product?.galleries?.length > 0 &&
                product?.galleries?.map((gallery, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${gallery?.url}`}
                    onClick={() => setShowImage(gallery?.url)}
                    alt={product?.title}
                    width={100}
                    height={60}
                    className="w-12 cursor-pointer md:h-32 md:w-full"
                  />
                ))}
            </div>

            <div className="order-1 md:order-2 md:col-span-6">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
                alt={product?.title}
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          {/* right-info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium">{product?.title}</h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-content">Available Now</p>
            </div>
            {/* Price */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-lg">
                {discount > 0 ? (
                  <>
                    <p className="text-lg">
                      {currencyFormatter(
                        product?.sellingPrice -
                          (product?.sellingPrice * discount) / 100,
                      )}
                    </p>
                    <del className="text-[15px] text-neutral-content opacity-80">
                      {currencyFormatter(product?.sellingPrice)}
                    </del>
                    <p className="text-[15px] text-red-500">{discount}% off</p>
                  </>
                ) : (
                  <p>{currencyFormatter(product?.sellingPrice)}</p>
                )}
              </div>
            </div>
            {/* details */}
            <div className="mt-5">
              <div className="mt-2 opacity-80">
                {product?.description && parser(product?.description)}
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 uppercase">
              <button
                onClick={() => dispatch(addToWishlist(product))}
                className="rounded border border-primary py-2 text-primary duration-300 hover:bg-primary hover:text-base-100"
              >
                Add to Wishlist
              </button>
              <button className="rounded border border-primary bg-primary py-2 text-base-100 duration-300 hover:bg-transparent hover:text-primary">
                কিনতে যোগাযোগ করুন
              </button>
            </div>
          </div>
        </div>

        <SimilarProducts
          category={product?.category?.slug}
          currentProduct={product?._id}
        />
      </div>
    </section>
  );
}
