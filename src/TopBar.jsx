import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const TopBar = ({ cartItemCount, onCartClick }) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="E-commerce" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">E-commerce</span>
        </Link>
      </div>
      <button onClick={onCartClick} className="relative right-[2%]">
        <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />
        {cartItemCount > 0 && (
          <span className="absolute bottom-4 left-4 bg-red-500 rounded-full text-xs px-2 py-1">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default TopBar;
