/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
const SerachCard = ({ product }) => {
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
          <div
            key={product?.id}
            className="flex bg-white border rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full sm:w-80 md:w-72 lg:w-80"
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
                  Rs. {product?.price}
                </h6>
              </div>
              <div className="mt-6 sm:mt-auto inline-flex">
                <button
                  // onClick={() => handleAddToCart(product)}
                  className="text-lg font-extrabold bg-yellow-500 rounded-md mt-2 text-white px-2 dark:text-neutral-500"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default SerachCard;
  