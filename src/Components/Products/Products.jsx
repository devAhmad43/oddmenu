import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { lazy, useState } from "react";
import { useSelector } from "react-redux";
import SerachCard from "./SerachCard";
import { selectProducts } from "../redux/cartSlice";
// import ProductCard from "./ProudctCard";
const ProudctCard = lazy(() => import("./ProudctCard"));

const Products = () => {
  const [searchValue, setSearchValue] = useState("");

  // Assuming you have a products array in your Redux store
  const products = useSelector(selectProducts);

  const clearInput = () => {
    setSearchValue(""); // Clear the input value
  };

  // Filter products based on the search value
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const navItems = [
    { name: "Breakfast", href: "", target: "_self" },
    { name: "Hot Meals", href: "", target: "_blank" },
    { name: "Salad", href: "", target: "_blank" },
    { name: "Deserts", href: "", target: "_self", extraclass: " text-red-200" },
  ];

  return (
    <>
      {/* categories header */}
      <nav>
        <ul className="flex flex-row items-center whitespace-nowrap overflow-x-auto uppercase justify-center w-full px-4 py-4 text-indigo-100 bg-yellow-500">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`pr-2 md:pr-4 text-xs lg:text-lg font-semibold ${
                item.extraclass || ""
              }`}
            >
              <a
                href={item.href}
                target={item.target}
                className="text-black uppercase underline underline-offset-2 hover:text-white"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* search bar */}
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-3xl mx-auto mt-2 px-4">
          <div className="relative">
            <input
              className="appearance-none border-b pl-10 border-gray-500 hover:border-gray-700 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-yellow-500 focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Search products here..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} // Update the input value
            />

            {/* Conditionally render the X icon if there's a search value */}
            {searchValue && (
              <div className="absolute right-0 inset-y-0 flex items-center">
                <FontAwesomeIcon
                  className="text-yellow-500 w-6 h-6 cursor-pointer"
                  icon={faXmark}
                  onClick={clearInput} // Clear the input when X is clicked
                />
              </div>
            )}

            {/* Magnifying glass icon */}
            <div className="absolute left-0 inset-y-0 flex items-center">
              <FontAwesomeIcon
                className="text-yellow-500 w-6 h-6"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>

          {/* Product cards */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {/* Conditionally render based on whether there's a searchValue */}
            {searchValue ? (
              // Show search results
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <SerachCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )
            ) : (
              // Show default product cards
              <ProudctCard />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
