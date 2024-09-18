import React from 'react';
import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
import { DUMMY_PRODUCTS } from "./dummy_products";
import CartContextProvider from './store/shopping-cart-context';

function App() {

  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
