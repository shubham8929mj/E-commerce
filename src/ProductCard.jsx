// ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  onAddToCart,
  isItemInCart,
  handleRemoveItem,
}) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    handleRemoveItem(product.id);
  };
  const handleRoute = (event) => {
    if (event.target.tagName !== "BUTTON") {
      navigate(`/product/${product.id}`);
    }
  };
  return (
    <div
      className="border rounded-lg p-4 h-[100%] shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 flex flex-col"
      onClick={handleRoute}
    >
      <div className="flex-grow flex items-center justify-center h-3/5">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain max-h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-2/5 mt-4 over">
        <h2 className="text-lg font-semibold mb-2 text-center">
          {product.title}
        </h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
        {isItemInCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
