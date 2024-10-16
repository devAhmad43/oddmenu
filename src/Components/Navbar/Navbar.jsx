import { Link } from "react-router-dom";
import { faBagShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { lazy, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";  // Selector for cart items

const Sidebar = lazy(() => import("../Cart/Sidebar"));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);  // Getting cart items from Redux
  console.log(cartItems , "aho");
  

  return (
    <>
      <nav className="fixed top-0 w-full lg:px-16 px-8 bg-yellow-500 z-20 shadow-md flex flex-wrap items-center lg:py-3 py-2">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/" className="flex text-lg font-semibold">
            <img
              src="https://dev.rz-codes.com/static/logo-275e932fd817cc84d99d91f7519a9a22.svg"
              width="60"
              height="60"
              className="p-2"
              alt="Rz Codes Logo"
            />
            <div className="mt-5 text-red-600 font-mono text-xl">ODD-MENU</div>
          </Link>
        </div>  

        {/* Cart icon with item count */}
        <div className="relative inline-block mr-1">
          <FontAwesomeIcon 
            onClick={() => setOpen(true)} 
            className="h-6 w-6 bg-white p-1 cursor-pointer rounded-md" 
            icon={faBagShopping} 
          />
          <h2 className="absolute -top-3 text-black -right-4 mb-2 text-xs rounded-lg border border-black bg-white  font-extrabold py-1 px-2">
            {cartItems.length} {/* Total number of cart items */}
          </h2>
        </div>

        {/* Login / Sign In Button */}
        <button className="hidden md:inline-block rounded-md mr-8 px-8 ml-5 font-sans text-xs py-1.5 border-2 border-yellow-600">
          Sign / Login
        </button>

        {/* Mobile User Icon */}
        <FontAwesomeIcon className="md:hidden ml-6 h-8 w-8 text-black" icon={faCircleUser} />
      </nav>

      {/* Sidebar Component */}
      {open && <Sidebar open={open} setOpen={setOpen} />} {/* Pass open and setOpen to control the sidebar */}
    </>
  );
};

export default Navbar;
