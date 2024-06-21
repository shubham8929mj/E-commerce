import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTrash,
  faCartPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, onRemoveItem, onQuantityChange, onClose }) => {
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-2">
      <div className="sticky top-0 left-0 right-0 z-50  flex justify-between items-center h-[10%]">
        <h2 className="text-xl font-bold">
          {cartItems.length === 0 ? "Empty" : "Your"} Cart
        </h2>
        <button onClick={onClose} className="mr-4 ">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="overflow-y-auto h-[80%]">
        {cartItems.length === 0 ? (
          <div className="mt-4 text-center flex justify-center items-center">
            <div>
              <FontAwesomeIcon
                icon={faCartPlus}
                className="text-6xl text-gray-300 mb-4"
              />
              <p>Please add some products to your cart</p>
              <Link
                onClick={onClose}
                to="/"
                className="mt-2 text-blue-500 hover:underline flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 animate-bounce w-5 h-5"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <ul className="mt-4 p-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-4 border-b pb-2"
                >
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{item.title}</h3>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => onRemoveItem(item.id)}
                          className="cursor-pointer text-red-500"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              onQuantityChange(item.id, item.quantity - 1)
                            }
                            className="text-blue-500"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              onQuantityChange(item.id, item.quantity + 1)
                            }
                            className="text-blue-500"
                          >
                            +
                          </button>
                        </div>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className=" h-[10%] ">
        {cartItems.length > 0 && (
          <h2 className="mt-4 text-xl text-center font-bold">
            Total: ${getTotalPrice()}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Cart;
