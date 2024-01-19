import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ cart }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    // <div>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            The Shop
          </Link>
        </div>
        <div className="flex-none">
          {decoded.isAdmin && (
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                <MenuIcon></MenuIcon>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          )}
          {!decoded.isAdmin && (
            <div role="button" className="btn btn-ghost btn-circle">
              <PersonIcon />
            </div>
          )}
          {!decoded.isAdmin && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart.cartQuantity}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {cart.cartQuantity} Items
                  </span>
                  <span className="text-info">
                    Subtotal: ${cart.totalPrice}
                  </span>
                  <div className="card-actions">
                    <Link to="/cart" className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <button className="btn btn-active btn-neutral" onClick={handleLogout}>
          SignOut
        </button> */}
          <div role="button" className="btn btn-ghost btn-circle">
            <LogoutIcon onClick={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
