import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetContactQuery } from "@/Redux/contact/contactApi";
import { useGetBusinessInfoQuery } from "@/Redux/businessInfoApi/businessInfoApi";
import { useGetCategoriesQuery } from "@/Redux/category/categoryApi";

export default function Footer() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  const { data: contactData } = useGetContactQuery();
  const contact = contactData?.data[0];

  const { data: business } = useGetBusinessInfoQuery();
  const businessInfo = business?.data[0];
  let yearNow = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pb-6 pt-10">
      <div className="container">
        <div className="xl:mx-36">
          <div className="grid grid-cols-2 gap-6 text-neutral sm:grid-cols-4 lg:grid-cols-6">
            <div>
              <h2 className="text-sm uppercase opacity-80">Category</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                {categories?.map((category) => (
                  <li key={category?._id}>
                    <Link to={`/shops?category=${category?.slug}`}>
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">About Us</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/videos">Videos</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ&apos;s</Link>
                </li>
                <li>
                  <Link to="/sell-iphone">Sell Iphone</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">Policies</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/terms-conditions">Terms & conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/return-policy">Returns</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm uppercase opacity-80">My Account</h2>
              <ul className="opacity-85 mt-4 flex flex-col gap-1.5 text-[13.5px]">
                <li>
                  <Link to="/cart">Shopping Bag</Link>
                </li>
                <li>
                  <Link to="/account/orders">Order History</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2">
              <h2 className="text-sm uppercase opacity-80">Follow US</h2>
              <ul className="opacity-85 mt-4 flex items-center gap-3 text-xl">
                {contact?.socials?.map((social, i) => (
                  <Link
                    key={i}
                    to={social?.url}
                    target="_blank"
                    className="text-2xl"
                  >
                    {React.createElement(FaIcons[social?.icon])}
                  </Link>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border-r pr-4">
                  <h2 className="text-sm uppercase opacity-80">Get in touch</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to={`tel:${contact?.phone}`}>{contact?.phone}</Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm uppercase opacity-80">Email us on</h2>
                  <ul className="opacity-85 mt-4 flex flex-col gap-1 text-[13.5px]">
                    <li>
                      <Link to={`mailto:${contact?.email}`}>
                        {contact?.email}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-4 text-center text-sm opacity-70">
            <p>
              © {businessInfo?.companyStartYear} - {yearNow}{" "}
              {businessInfo?.companyName} All Rights Reserved. Developed by{" "}
              <Link
                to="https://www.nasimuddin.me"
                target="_blank"
                className="underline"
              >
                Nasim
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
