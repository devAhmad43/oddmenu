/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartSlice';

const Details = ({ product, onClose }) => {
  const dispatch = useDispatch();

  // Get the current cart item by product id
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === product?.id)
  );

  // Increase product quantity
  const increaseQuantity = () => {
    dispatch(addProduct({ ...product, quantity: (cartItem?.quantity || 0) + 1 }));
  };

  // Decrease product quantity (with a minimum of 0)
  const decreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 0) {
      dispatch(removeProduct(product));
    }
  };

  if (!product) return null;

  // Calculate total price based on quantity
  const totalPrice = (cartItem ? cartItem.quantity : 0) * product.price;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg m-2 p-6 max-w-2xl w-full flex flex-col sm:flex-row">
        {/* Left side with image */}
        <div className="relative flex-shrink-0 w-full sm:w-1/2 mb-4 sm:mb-0">
          <img
            className="w-full h-48 md:h-[400px] md:w-[400px] object-cover rounded-lg sm:rounded-l-lg"
            src={product?.image}
            alt={product?.title}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs sm:text-md">
            <p className="font-bold">{product?.description}</p>
          </div>
        </div>

        {/* Right side with product details */}
        <div className="flex flex-col justify-between p-4 w-full sm:w-1/2">
          <h2 className="text-lg sm:text-xl font-bold mb-2">{product?.title}</h2>
          <h3 className="text-md sm:text-lg font-bold">Price: Rs. {product?.price}</h3>

          {/* Quantity control buttons */}
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs sm:text-sm"
              disabled={!cartItem || cartItem.quantity === 0}
            >
              -
            </button>
            <span className="text-xs sm:text-sm">{cartItem ? cartItem.quantity : 0}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs sm:text-sm"
            >
              +
            </button>
          </div>

          {/* Total Price Field */}
          <h3 className="text-md sm:text-lg font-bold mt-4">
            Total: Rs. {totalPrice.toFixed(2)}
          </h3>

          <button
            onClick={onClose}
            className="mt-2 w-full bg-yellow-500 text-white py-1 rounded-md font-bold text-xs sm:text-sm"
          >
            Proceed to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
