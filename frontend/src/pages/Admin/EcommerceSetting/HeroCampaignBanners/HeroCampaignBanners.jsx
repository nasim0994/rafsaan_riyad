import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  useDeleteHeroCampaignBannerMutation,
  useGetHeroCampaignBannersQuery,
} from "@/Redux/heroCampaignBanner/heroCampaignBannerApi";
import toast from "react-hot-toast";
import Spinner from "@/components/shared/Spinner/Spinner";

export default function HeroCampaignBanners() {
  const { data, isLoading } = useGetHeroCampaignBannersQuery();
  const banners = data?.data;
  const [deleteHeroCampaignBanner] = useDeleteHeroCampaignBannerMutation();

  const handleDeleteBanner = async (id) => {
    const isConfirm = window.confirm("are you sure delete this banner?");
    if (isConfirm) {
      await deleteHeroCampaignBanner(id);
      toast.success("Banner Deleted Successfully");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Hero Campaign Banner Lists</h3>
        {banners?.length < 2 && (
          <Link
            to="/admin/business/section/hero-campaign-banner/add"
            className="primary_btn"
          >
            Add New
          </Link>
        )}
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Banner Image</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {banners?.length > 0 ? (
                banners?.map((banner) => (
                  <tr key={banner?._id}>
                    <td>{banner?.order}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/herocampaignBanner/${banner?.image}`}
                          alt="herocampaignBanner"
                          className="h-10 w-16"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td>{banner?.link}</td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link
                          to={`/admin/business/section/hero-campaign-banner/edit/${banner?._id}`}
                          className="duration-200 hover:text-red-500"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteBanner(banner?._id)}
                          className="duration-200 hover:text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="p-4 text-neutral-content">No Banner Available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
