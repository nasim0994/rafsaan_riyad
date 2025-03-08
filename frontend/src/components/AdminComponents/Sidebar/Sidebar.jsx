import { RiAdminFill, RiPagesLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { IoFlashOutline, IoStorefrontOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { TbShoppingBagCheck } from "react-icons/tb";
import { CgSearchFound } from "react-icons/cg";
import { MdMonitor } from "react-icons/md";

import SidebarItems from "./SidebarItems";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/user/userSlice";
import { FaUsers } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { useGetMainLogoQuery } from "@/Redux/logo/logoApi";

const adminSidebarItems = [
  {
    title: "Dashboard",
    menu: [
      {
        icon: <BiCategory />,
        title: "Dashboard",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Product",
    menu: [
      {
        icon: <BsBoxes />,
        title: "Product",
        subMenu: [
          {
            title: "Category",
            subSubMenu: [
              {
                title: "Categories",
                path: "/admin/product/category/all",
              },
              {
                title: "Sub Categories",
                path: "/admin/product/category/sub-category/all",
              },
              {
                title: "Sub Sub Categories",
                path: "/admin/product/category/sub-sub-category/all",
              },
            ],
          },
          {
            title: "Product",
            path: "/admin/product/all",
          },
        ],
      },
    ],
  },
  {
    title: "Orders",
    menu: [
      {
        icon: <TbShoppingBagCheck />,
        title: "Order",
        subMenu: [
          {
            title: "All Orders",
            path: "/admin/order/all",
          },
          {
            title: "Today's Orders",
            path: "/admin/order/today",
          },
        ],
      },
    ],
  },
  {
    title: "Promo",
    menu: [
      {
        icon: <IoFlashOutline />,
        title: "Flash Sale",
        path: "/admin/promo/flash-sale/all",
      },
    ],
  },
  {
    title: "Users",
    menu: [
      {
        icon: <FaUsers />,
        title: "Customers",
        path: "/admin/user/customer/all",
      },
      {
        icon: <RiAdminFill />,
        title: "Administrator",
        path: "/admin/administrator/all",
      },
    ],
  },
  {
    title: "Business Setting",
    menu: [
      {
        icon: <IoStorefrontOutline />,
        title: "E-commerce",
        subMenu: [
          {
            title: "Company",
            path: "/admin/business/e-commerce/company",
          },
        ],
      },
      {
        icon: <RiPagesLine />,
        title: "Pages",
        subMenu: [
          {
            title: "About Us",
            path: "/admin/pages/about-us",
          },
          {
            title: "Contact Us",
            path: "/admin/pages/contact-us",
          },
          {
            title: "Videos",
            path: "/admin/pages/videos",
          },
          {
            title: "FAQ",
            path: "/admin/pages/faq/all",
          },
          {
            title: "Privacy Policy",
            path: "/admin/pages/privacy-policy",
          },
          {
            title: "Terms & Conditions",
            path: "/admin/pages/terms-conditions",
          },
          {
            title: "Return Policy",
            path: "/admin/pages/return-policy",
          },
        ],
      },
      {
        icon: <PiFlagBannerFill />,
        title: "Section",
        subMenu: [
          {
            title: "Banner",
            path: "/admin/business/section/banner/all",
          },
          {
            title: "Hero Campaign",
            path: "/admin/business/section/hero-campaign-banner/all",
          },
          {
            title: "Campaign Banner",
            path: "/admin/business/section/campaign-banner",
          },
        ],
      },
    ],
  },
  {
    title: "Setting",
    menu: [
      {
        icon: <IoMdSettings />,
        title: "General Setting",
        subMenu: [
          {
            title: "Profile",
            path: "/admin/general-setting/profile",
          },
        ],
      },
      {
        icon: <MdMonitor />,
        title: "Front-End",
        subMenu: [
          {
            title: "Logo",
            path: "/admin/front-end/logo",
          },
          {
            title: "Favicon",
            path: "/admin/front-end/favicon",
          },
        ],
      },
    ],
  },
  {
    title: "SEO",
    menu: [
      {
        icon: <CgSearchFound />,
        title: "SEO Setting",
        path: "/admin/seo-setting",
      },
    ],
  },
];

export default function Sidebar() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;
  const dispatch = useDispatch();

  const { data: logoData } = useGetMainLogoQuery();
  const logo = logoData?.data && logoData?.data[0]?.logo;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="sidebar_menu">
        <Link to="/admin/dashboard">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo}`}
            alt="logo"
            className="mx-auto my-3 w-24 sm:w-32"
          />
        </Link>

        <nav className="admin_sidebar_item flex flex-col gap-3">
          {adminSidebarItems?.map((item, i) => (
            <ul key={i}>
              <h3 className="pb-2 text-[13px] uppercase text-neutral/60">
                {item?.title}
              </h3>
              {item?.menu?.map((menu, i) => (
                <SidebarItems key={i} item={menu} />
              ))}
            </ul>
          ))}
        </nav>
      </div>

      <div className="border-t py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img
              src="/images/demo_user.jpg"
              alt="user"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <p className="-mt-px text-xs text-neutral-content">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const isConfirm = window.confirm(
                "Are you sure you want to logout?",
              );
              if (isConfirm) {
                dispatch(userLogout());
              }
            }}
            className="rounded bg-red-100 px-3 py-1.5 text-[13px] text-red-500 duration-300 hover:bg-red-500 hover:text-base-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
