import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, selectProducts } from "../redux/cartSlice"; // Adjust the import path accordingly
import Details from "./Detail";
import food_1 from "../../assets/food_1.png";
import food_2 from "../../assets/food_2.png";
import food_3 from "../../assets/food_3.png";
import food_4 from "../../assets/food_4.png";
import food_5 from "../../assets/food_5.png";
import food_6 from "../../assets/food_6.png";

const ProductCard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // To track the selected product for modal
  const products = useSelector(selectProducts);

  const productCategories = {
    breakfast: "Breakfast",
    hotMeals: "Hot Meals",
    desserts: "Desserts",
    salads: "Salads",
  };

  const initialProducts = {
    breakfast: [
      { id: 1, title: "Double Up Deal", description: "2 Large Round Special Pizzas & 1.5 Litre Soft Drink", image: food_1, price: 4020 },
      { id: 2, title: "Square Deal", description: "3 Square Pizzas, 12 Wings & 2 - 1.5 Litre Soft Drink", image: food_2, price: 1310 },
      { id: 3, title: "Square Deal", description: "3 Square Pizzas, 12 Wings & 2 - 1.5 Litre Soft Drink", image: food_2, price: 1310 },

    ],
    hotMeals: [
      { id: 4, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_3, price: 3320 },
      { id: 5, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_4, price: 3320 },
      { id: 6, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_4, price: 3320 },
    ],
    desserts: [
      { id: 7, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_5, price: 3320 },
      { id: 8, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_6, price: 3320 },
      { id: 9, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_5, price: 3320 }

    ],
    salads: [
      { id: 10, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_6, price: 3320 },
      { id: 11, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_6, price: 3320 },
      { id: 12, title: "Super Deal", description: "1 Large Square Pizza, 1 Medium Square Pizza, 12 Pcs Wings, 1 Pasta...", image: food_6, price: 3320 }

    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const allProducts = Object.values(initialProducts).flat();
      dispatch(addProducts(allProducts));
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const categorizedProducts = {
    breakfast: products.filter(product => initialProducts.breakfast.some(p => p.id === product.id)),
    hotMeals: products.filter(product => initialProducts.hotMeals.some(p => p.id === product.id)),
    desserts: products.filter(product => initialProducts.desserts.some(p => p.id === product.id)),
    salads: products.filter(product => initialProducts.salads.some(p => p.id === product.id)),
  };

  // Function to handle the "Add to cart" click and open the modal
  const handleAddToCart = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  return (
    <div className="justify-center items-center">
      <h2 className="text-2xl font-bold mb-6 mt-4">Product Categories</h2>
      {Object.keys(productCategories).map((categoryKey) => (
        <div key={categoryKey} className="mb-10">
          <h3 className="text-xl font-bold mb-4 capitalize">{productCategories[categoryKey]}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="rounded-lg p-4 bg-gray-200 animate-pulse max-w-sm mx-auto">
                  <div className="flex space-x-4 py-6">
                    <div className="rounded-full bg-gray-500 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-500 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-500 rounded"></div>
                        <div className="h-4 bg-gray-500 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              categorizedProducts[categoryKey]?.map((product) => (
                <div
                  key={product?.id}
                  className="flex bg-white border rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                >
                  <div className="shrink-0">
                    <img
                      className="w-40 h-full object-cover rounded-xl"
                      src={product?.image}
                      alt={product?.title}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-md -mt-2 font-extrabold text-gray-800 dark:text-white">
                        {product?.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-sans dark:text-neutral-400">
                        {product?.description}
                      </p>
                    </div>
                    <div className="inline-flex">
                      <h6 className="text-xs py-1 px-2 mt-1 rounded-md font-extrabold text-black bg-yellow-500 dark:text-neutral-500">
                        Rs.{product?.price}
                      </h6>
                    </div>
                    <div className="mt-6 sm:mt-auto inline-flex">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="text-lg font-extrabold bg-yellow-500 rounded-md mt-2 text-white px-2 dark:text-neutral-500"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
      {/* Modal for showing the selected product details */}
      {selectedProduct && <Details product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    
    </div>
  );
};

export default ProductCard;
