import { currencyFormatter } from "@/lib/currencyFormatter";
import { removeFromCart } from "@/Redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CartItem({ product }) {
  const { slug, title, price, discount, thumbnail } = product;

  const dispatch = useDispatch();

  return (
    <div className="flex items-start gap-3">
      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/products/${thumbnail}`}
          alt={title}
          width={100}
          height={80}
        />
      </div>

      <div className="w-full items-start justify-between border-b pb-3 sm:flex">
        <div>
          <Link
            to={`/product/${slug}`}
            className="duration-300 hover:text-primary"
          >
            {title}
          </Link>
          <p className="w-max rounded bg-gray-100 px-2 py-1 text-xs text-neutral">
            Qty: {product?.quantity}
          </p>
        </div>

        <div className="text-end">
          <div className="mt-1 flex items-center justify-end gap-2">
            {discount > 0 ? (
              <div className="mt-1 flex items-center gap-2">
                <p>{currencyFormatter(price - (price * discount) / 100)}</p>
                <del className="text-[11px] text-sm text-neutral-content opacity-80">
                  {currencyFormatter(price)}
                </del>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <p>{currencyFormatter(price)}</p>
              </div>
            )}
          </div>
          <div className="mt-1">
            <button
              onClick={() => dispatch(removeFromCart(product))}
              className="text-sm text-blue-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
