import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Product = ({ setCart, cart }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/get-product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = async (e, productId, productPrice) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/cart", {
        userId: decoded._id, // Pretpostavljamo da imate korisnički ID dostupan
        productId: productId,
        productPrice: productPrice,
        quantity: quantity, // Ovdje možete prilagoditi količinu prema potrebi
      });

      setCart(response.data.cart);

      await fetchData();
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Ovdje možete dodati logiku za prikazivanje poruke o pogrešci korisniku
    }
  };
  const fetchData = async () => {
    try {
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

      //setCart({response.data});
      //console.log("podaci", data.cart.totalPrice);
    } catch (error) {
      console.error("Error while fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`http://localhost:8080/Images/${product.image}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center"></span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="select select-bordered w-full max-w-xs text-white">
                      <option disabled selected>
                        Select Size
                      </option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                  </div>
                </div> */}
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Quantity</span>
                  <div className="relative">
                    <button
                      className="btn btn-active btn-neutral text-white"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="btn btn-active btn-neutral text-white"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>

                <button
                  onClick={(e) => {
                    handleClick(e, product._id, product.price);
                    fetchData();
                  }}
                  className="btn btn-active btn-neutral flex ml-auto py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
