import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import ProductDetails from './ProductDetails.jsx';
import TopBar from './TopBar.jsx';
import Cart from './Cart.jsx';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: quantity > 0 ? quantity : 1 }
        : item
    ));
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Router>
      <TopBar cartItemCount={cartItems.length} onCartClick={handleCartClick} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} cartItems={cartItems} handleRemoveItem={handleRemoveItem}/>} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} cartItems={cartItems} handleRemoveItem={handleRemoveItem}/>} />
      </Routes>
      {isCartOpen && (
        <Cart 
          cartItems={cartItems} 
          onRemoveItem={handleRemoveItem} 
          onQuantityChange={handleQuantityChange}
          onClose={handleCloseCart}
        />
      )}
    </Router>
  );
};

export default App;
