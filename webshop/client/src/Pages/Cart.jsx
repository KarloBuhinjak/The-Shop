import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [cart, setCart] = useState([]);

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
          `http://localhost:8080/api/cart/${decoded._id}`
        );
        //console.log(response.data);
        setCart(response.data);
        console.log(response.data, "test1");
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

        {cart.cart && cart.cart.products.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>

                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cart.products.map((product) => (
                      <tr key={product._id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              className="h-16 w-16 mr-4"
                              src={`http://localhost:8080/images/${product.image}`}
                              alt={product.productName}
                            />
                            <span className="font-semibold">
                              {product.productName}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">${product.productPrice}</td>

                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={handleDecrement}
                            >
                              -
                            </button>
                            <span className="text-center w-8">
                              {product.quantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={handleIncrement}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">${product.productTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cart.cart.totalPrice}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${cart.cart.totalPrice}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </div>
    </div>
  );
};

export default Cart;
