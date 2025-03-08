/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";

import MainLayout from "@/Layout/MainLayout";
import Home from "@/pages/main/Home";

// /Lazy import
const AboutUs = React.lazy(() => import("@/pages/main/AboutUs"));
const ContactUs = React.lazy(() => import("@/pages/main/ContactUs"));
const Shop = React.lazy(() => import("@/pages/main/Shop"));
const PrivacyPolicy = React.lazy(() => import("@/pages/main/PrivacyPolicy"));
const TermsCondition = React.lazy(() => import("@/pages/main/TermsCondition"));
const ReturnPolicy = React.lazy(() => import("@/pages/main/ReturnPolicy"));
const FAQ = React.lazy(() => import("@/pages/main/FAQ"));
const ProductDetails = React.lazy(() => import("@/pages/main/ProductDetails"));
const Login = React.lazy(() => import("@/pages/main/Login"));
const Signup = React.lazy(() => import("@/pages/main/Signup"));
const Wishlist = React.lazy(() => import("@/pages/main/Wishlist"));

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <AboutUs />
        </Suspense>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <ContactUs />
        </Suspense>
      ),
    },
    {
      path: "/shops",
      element: (
        <Suspense fallback={<Spinner />}>
          <Shop />
        </Suspense>
      ),
    },
    {
      path: "/shops/:category",
      element: (
        <Suspense fallback={<Spinner />}>
          <Shop />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<Spinner />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
    {
      path: "/terms-conditions",
      element: (
        <Suspense fallback={<Spinner />}>
          <TermsCondition />
        </Suspense>
      ),
    },
    {
      path: "/return-policy",
      element: (
        <Suspense fallback={<Spinner />}>
          <ReturnPolicy />
        </Suspense>
      ),
    },
    {
      path: "/faq",
      element: (
        <Suspense fallback={<Spinner />}>
          <FAQ />
        </Suspense>
      ),
    },
    {
      path: "/product/:slug",
      element: (
        <Suspense fallback={<Spinner />}>
          <ProductDetails />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Spinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Spinner />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <Suspense fallback={<Spinner />}>
          <Wishlist />
        </Suspense>
      ),
    },
  ],
};
