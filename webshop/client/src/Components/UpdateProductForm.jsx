import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProductForm = ({ name, brand, description, price, image }) => {
  let navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: name,
    brand: brand,
    description: description,
    price: price,
    image: image,
  });
  const [currentImage, setCurrentImage] = useState(image);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, image: file });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("brand", productData.brand);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("file", productData.image);
    console.log(productData);
    try {
      const response = await axios.put(
        "http://localhost:8080/api/product/product",
        formData
      );
      //navigate("/");
    } catch (error) {
      console.error("Error while saving product:", error);
    }
  };

  return (
    <div>
      <div
        className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20"
        style={{ backgroundColor: "rgba(29, 35, 42, 1)" }}
      >
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Update product
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="productname"
              >
                Product name
              </label>
              <input
                id="productname"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="brand">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                type="textarea"
                value={productData.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload</span>

                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>

                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="btn btn-active btn-primary flex ml-auto py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span className="">Upload a file</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <p className="pl-1 text-white">or drag and drop</p>
      </div>
    </div>
  );
};

export default UpdateProductForm;
