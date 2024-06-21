import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader.jsx";

const ProductDetails = ({ onAddToCart, cartItems, handleRemoveItem }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 h-64 md:h-96 bg-gray-200 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>
          <div className="flex items-center">
            <div className="text-yellow-500 mr-2">
              {Array(Math.round(product.rating.rate))
                .fill()
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>
            <span className="text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          {cartItems.some((item) => item.id === product.id) ? (
            <button
              onClick={() => handleRemoveItem(product.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover-bg-blue-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
