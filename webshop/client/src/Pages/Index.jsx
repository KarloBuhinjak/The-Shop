import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddProductForm from "../Components/AddProductForm";
import UpdateProductForm from "../Components/UpdateProductForm";

const Index = ({ setCart, cart }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/product/get-products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!decoded.isAdmin) {
        const response = await axios.get(
          `http://localhost:8080/api/cart/${decoded._id}`
        );
        let cartQuantity = response.data.cart.totalQuantity;
        let totalPrice = response.data.cart.totalPrice;
        setCart((previousCart) => ({
          ...previousCart,
          cartQuantity,
          totalPrice,
        }));
      }
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (
    e,
    productId,
    productName,
    productPrice,
    image
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/cart", {
        userId: decoded._id,
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        image: image,
        quantity: 1,
      });

      setCart(response.data.cart);
      fetchData(); // Odmah nakon postavljanja korpe, pozovite fetchData
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const deleteProduct = async (e, productId) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/product/product/${productId}`
      );

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-semibold mb-10">Products</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={decoded.isAdmin ? "#" : `/product/${product._id}`}
              className="group border border-gray-300 rounded-lg overflow-hidden p-4 flex flex-col h-full"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden mb-2">
                <img
                  src={`http://localhost:8080/Images/${product.image}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 "
                  alt={product.name}
                />
              </div>

              <div className="mt-auto flex flex-col items-center">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
                {!decoded.isAdmin && (
                  <button
                    className="btn btn-outline mt-4 py-2 px-6 focus:outline-none hover:bg-indigo-600"
                    onClick={(e) => {
                      handleClick(
                        e,
                        product._id,
                        product.name,
                        product.price,
                        product.image
                      );
                      //fetchData();
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                {decoded.isAdmin && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="btn btn-outline py-2 px-6 focus:outline-none hover:bg-indigo-600"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline py-2 px-6 btn-primary"
                      onClick={(e) => deleteProduct(e, product._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() =>
                          document.getElementById("my_modal_3").close()
                        }
                      >
                        ✕
                      </button>
                    </form>

                    <p className="py-1 px-1">
                      <UpdateProductForm {...product} />
                    </p>
                  </div>
                </dialog>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
