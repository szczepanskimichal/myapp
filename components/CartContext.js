"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, []);

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const position = prev.indexOf(productId);
      if (position !== -1) {
        return prev.filter((value, index) => index !== position);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
