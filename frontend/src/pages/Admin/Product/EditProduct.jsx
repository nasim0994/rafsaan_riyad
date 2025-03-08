import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import JoditEditor from "jodit-react";
import ImageUploading from "react-images-uploading";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Redux/product/productApi";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "@/Redux/category/categoryApi";
import { useGetSubCategoryQuery } from "@/Redux/subCategory/subCategoryApi";
import { useAllBrandsQuery } from "@/Redux/brand/brandApi";

export default function EditProduct() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [thumbnail, setThumbnail] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [galleriesUrl, setGalleriesUrl] = useState([]);

  const [title, setTitle] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [details, setDetails] = useState("");

  const [sellingPrice, setSellingPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);

  const { data, isLoading: pLoading } = useGetProductByIdQuery(id);
  const product = data?.data;

  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const { data: brands } = useAllBrandsQuery();

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setCategoryId(product?.category?._id);
      setSubCategoryId(product?.subCategory?._id);
      setSubSubCategoryId(product?.subSubCategory?._id);
      setBrand(product?.brand);
      setDiscount(product?.discount);
      setDetails(product?.description);
      setSellingPrice(product?.sellingPrice);
      setStock(product?.totalStock);

      if (product?.galleries?.length > 0) {
        setGalleriesUrl(product?.galleries);
      }
    }
  }, [product]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      file: file,
    }));

    setGalleries((prevGalleries) => [...prevGalleries, ...newImages]);
  };

  // Remove image from the gallery
  const removeImage = (index) => {
    const updatedGallery = galleries.filter((_, i) => i !== index);
    setGalleries(updatedGallery);
  };

  const removeGalleryUrl = (index) => {
    const updatedGallery = galleriesUrl?.filter((_, i) => i !== index);
    setGalleriesUrl(updatedGallery);
  };

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!title) return toast.warning("Title is required");
    if (!categoryId) return toast.warning("Category is required");
    if (!sellingPrice) return toast.warning("Selling Price is required");
    if (!details) return toast.warning("Description is required");

    const formData = new FormData();

    formData.append("thumbnail", thumbnail[0]?.file);
    if (galleries?.length > 0)
      galleries.forEach((gallery) => formData.append("gallery", gallery.file));
    if (galleriesUrl?.length > 0)
      formData.append("galleriesUrl", JSON.stringify(galleriesUrl));
    formData.append("title", title);
    formData.append("category", categoryId);
    if (subCategoryId) formData.append("subCategory", subCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    if (brand) formData.append("brand", brand);
    formData.append("sellingPrice", sellingPrice);
    formData.append("totalStock", stock);
    formData.append("discount", discount);
    formData.append("description", details);

    const res = await updateProduct({ id, formData });

    if (res?.data?.success) {
      toast.success("Product added successfully");
      setThumbnail([]);
      setTitle("");
      setCategoryId("");
      setSubCategoryId("");
      setSubSubCategoryId("");
      setBrand("");
      setDiscount("");
      setSellingPrice("");
      setStock("");
      setDetails("");
      navigate("/admin/product/all");
    } else {
      toast.error(res?.data?.message || "Failed to add product");
      console.log(res);
    }
  };

  if (pLoading) return <p>Loading...</p>;

  return (
    <div className="add_product rounded bg-base-100 shadow">
      <h3 className="border-b p-4 text-lg font-medium text-neutral">
        Edit Product
      </h3>

      <div className="p-2 text-neutral-content xl:col-span-3">
        <div className="rounded border p-4">
          <p className="mb-2 text-sm">Edit Thumbnail</p>
          <ImageUploading
            value={thumbnail}
            onChange={(img) => setThumbnail(img)}
            dataURLKey="data_url"
          >
            {({ onImageUpload, onImageRemove, dragProps }) => (
              <div className="grid gap-4 sm:grid-cols-2" {...dragProps}>
                <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed p-3">
                  <span
                    onClick={onImageUpload}
                    className="cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                  >
                    Choose Image
                  </span>

                  <p className="text-neutral-content">or Drop here</p>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded border border-dashed p-3 lg:grid-cols-3 xl:grid-cols-4">
                  {!thumbnail?.length && product?.thumbnail ? (
                    <img
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/products/" +
                        product?.thumbnail
                      }
                      alt="thumbnail"
                      className="h-20 w-full"
                    />
                  ) : (
                    thumbnail?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt="thumbnail"
                          className="h-20 w-full"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        {/* gallery */}
        <div className="mt-3 rounded border p-4">
          <p className="mb-2 text-sm">
            Edit Gallery <small>(optional - max 10 images)</small>
          </p>

          <div className="mt-2 text-sm">
            <div className="flex flex-wrap space-x-2">
              {galleriesUrl?.length > 0 &&
                galleriesUrl?.map((img, index) => (
                  <div
                    key={index}
                    className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                  >
                    <img
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/products/" +
                        img?.url
                      }
                      alt={img?.name}
                      className="h-full w-full rounded border object-cover"
                    />

                    <button
                      onClick={() => removeGalleryUrl(index)}
                      className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100"
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                ))}

              {galleries?.length > 0 &&
                galleries?.map((img, index) => (
                  <div
                    key={index}
                    className="relative mb-2 h-14 w-20 overflow-hidden rounded object-cover"
                  >
                    <img
                      src={URL.createObjectURL(img?.file)}
                      alt={img?.name}
                      className="h-full w-full rounded border object-cover"
                    />

                    <button
                      onClick={() => removeImage(index)}
                      className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/60 text-base-100 opacity-0 duration-300 hover:text-red-500 hover:opacity-100"
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                ))}

              <div className="relative flex h-14 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-primary bg-primary/10">
                <input
                  type="file"
                  multiple
                  className="absolute z-50 h-full w-full cursor-pointer"
                  style={{ opacity: 0, top: 0, left: 0, cursor: "pointer" }}
                  onChange={handleFileChange}
                />

                <span className="text-primary">+ Add more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form_group mt-3">
          {/* product info , category & brand */}
          <div className="mb-5 flex flex-col gap-3 rounded border p-4">
            <div>
              <p className="text-sm">Product Title</p>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                defaultValue={title}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Category *</p>
                <select
                  name="category"
                  required
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                >
                  <option value="">Select Category</option>
                  {categories?.data?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Sub Category</p>
                <select
                  name="sub_category"
                  onChange={(e) => setSubCategoryId(e.target.value)}
                  value={subCategoryId}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories?.length > 0 &&
                    subCategories?.map((subCategory) => (
                      <option key={subCategory?._id} value={subCategory?._id}>
                        {subCategory?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Sub SubCategory</p>
                <select
                  name="sub_subCategory"
                  onChange={(e) => setSubSubCategoryId(e.target.value)}
                  value={subSubCategoryId}
                >
                  <option value="">Select Sub SubCategory</option>
                  {subSubCategories?.length > 0 &&
                    subSubCategories?.map((subSubCategory) => (
                      <option
                        key={subSubCategory?._id}
                        value={subSubCategory?._id}
                      >
                        {subSubCategory?.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <p className="text-sm">Brand</p>
                <select
                  name="brand"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                >
                  <option value="">Select Brand</option>
                  <option value="No Brand">No Brand</option>
                  {brands?.data?.length > 0 &&
                    brands?.data?.map((brand) => (
                      <option key={brand?._id} value={brand?.slug}>
                        {brand?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price & Discount & stock  */}
          <div className="mt-4 rounded border p-4">
            <p>Price & Discount </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm">Base Selling Price *</p>
                <input
                  type="number"
                  name="sellingPrice"
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                  value={sellingPrice}
                />
              </div>

              <div>
                <p className="text-sm">Discount %</p>
                <input
                  type="number"
                  name="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                />
              </div>

              <div>
                <p className="text-sm">Stock *</p>
                <input
                  type="number"
                  name="stock"
                  onChange={(e) => setStock(e.target.value)}
                  required
                  value={stock}
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="add_product_details mt-6 rounded border p-4">
            <p className="text-sm">Description</p>

            <div className="mt-2">
              <JoditEditor
                ref={editor}
                value={details}
                onBlur={(text) => setDetails(text)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <button
              onClick={handleEditProduct}
              type="submit"
              disabled={isLoading}
              className="rounded bg-primary px-10 py-2 text-base-100"
            >
              {isLoading ? "Loading..." : "Edit Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
