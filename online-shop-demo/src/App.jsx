import React from 'react';
import { useState } from "react";
import { CartContext } from "./store/shopping-cart-context";

import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
import { DUMMY_PRODUCTS } from "./dummy_products";

function App() {

  const [shoppingCart, setShoppingCart] = useState({
    items: []
  });
  
  function handleAddItemToCart(id) {
    console.log(id, 'id');
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      console.log(updatedItems, 'updatedItems => handleAddItemToCart');

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      console.log(existingCartItemIndex, 'existingCartItemIndex');

      const existingCartItem = updatedItems[existingCartItemIndex];

      console.log(existingCartItem, 'existingCartItem')

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  console.log(shoppingCart, 'shopppingCart');

  function handleUpdateCartItemQuantity(productId, amount) {
    console.log(productId, amount, 'productId and amount');
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      console.log(updatedItem, 'updatedItem');

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const valueCtx = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity
  }

  return (
    <CartContext.Provider value={valueCtx}>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
