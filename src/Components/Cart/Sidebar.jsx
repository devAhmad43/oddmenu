/* eslint-disable react/prop-types */
'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addProduct, removeProduct, getTotal, removeFromCart } from '../redux/cartSlice'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ setOpen, open }) => {
  const dispatch = useDispatch()
  
  // Get cart items and total amount from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  // Calculate total whenever cart items change
  useEffect(() => {
    dispatch(getTotal()) // Calculate total based on cart items
  }, [cartItems, dispatch])

  // Increase quantity handler
  const increaseQuantity = (product) => {
    dispatch(addProduct(product)) // Dispatch action to add a product
  }

  // Decrease quantity handler
  const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(removeProduct(product)) // Dispatch action to remove one unit of a product
    }
  }

  // Remove item handler
  const removeItem = (product) => {
    dispatch(removeFromCart(product)) // Dispatch action to remove the product completely
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-30">
      <DialogBackdrop
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              className={`pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-yellow-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.imageAlt}
                                src={product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex justify-between">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">Rs. {product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="ml-4">
                                  {/* Add the delete icon */}
                                  <button
                                    type="button"
                                    onClick={() => removeItem(product)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                <p className="text-gray-500">Qty {product.quantity}</p>

                                <div className="flex space-x-2 items-center">
                                  <button
                                    type="button"
                                    onClick={() => decreaseQuantity(product)}
                                    className="px-2 py-1 bg-yellow-300 text-gray-600 rounded"
                                  >
                                    -
                                  </button>
                                  <span>{product.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => increaseQuantity(product)}
                                    className="px-2 py-1 bg-yellow-300 text-gray-600 rounded"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs. {totalAmount}</p> {/* Display the calculated total */}
                  </div>
                  <div className="mt-6">
                    {/* Replace with another link or button as needed */}
                    <button
                      className="flex items-center justify-center w-full rounded-md border border-transparent bg-yellow-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-600"
                      onClick={() => alert('Functionality to checkout will be implemented.')}
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default Sidebar;
