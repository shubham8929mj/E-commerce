// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import Loader from "./Loader.jsx";

const Home = ({ onAddToCart, cartItems, handleRemoveItem }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              isItemInCart={cartItems.some(item => item.id === product.id)} 
              handleRemoveItem={handleRemoveItem} // Pass the function to remove from cart
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
