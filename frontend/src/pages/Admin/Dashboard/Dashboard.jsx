import { FaBoxOpen, FaUsers, FaUserShield } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { useGetAllProductsQuery } from "@/Redux/product/productApi";
import { useAllUsersQuery } from "@/Redux/user/userApi";
import { useGetAllAdminsQuery } from "@/Redux/admin/adminApi";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";
import { useGetSubCategoriesQuery } from "@/Redux/subCategory/subCategoryApi";
import { useGetSubSubCategoriesQuery } from "@/Redux/subSubCategory/subSubCategoryApi";

export default function Dashboard() {
  const { data: products } = useGetAllProductsQuery();
  const { data: users } = useAllUsersQuery();
  const { data: admin } = useGetAllAdminsQuery();
  const { data: category } = useGetCategoriesQuery();
  const { data: subCategory } = useGetSubCategoriesQuery();
  const { data: subSubCategory } = useGetSubSubCategoriesQuery();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return (
    <section>
      {/* card */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Products</p>
            <h3 className="font-bold text-primary">{products?.data?.length}</h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <FaBoxOpen className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Categories</p>
            <h3 className="font-bold text-green-600">
              {category?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total SubCategories</p>
            <h3 className="font-bold text-green-600">
              {subCategory?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">
              Total Sub Sub-Categories
            </p>
            <h3 className="font-bold text-green-600">
              {subSubCategory?.data?.length}
            </h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Users</p>
            <h3 className="font-bold text-green-600">{users?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-base-100">
            <FaUsers className="text-xl" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow">
          <div>
            <p className="font-dinMedium text-neutral">Total Administrators</p>
            <h3 className="font-bold text-green-600">{admin?.data?.length}</h3>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
            <FaUserShield className="text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
