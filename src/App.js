import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));
  };

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));
  };

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());
  };

  const refreshCart = async () => {
    const { newCart } = commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.error(error);
      setErrorMessage("error.handleCaptureCheckout");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateCartQuantity={handleUpdateCartQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
