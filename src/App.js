import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import LoginForm from './components/LoginForm';
import Header from './components/Header/header';
import Home from './components/Home/home';
import AllRestaurants from './components/AllRestaurants/allrestaurants';
import Cart from './components/Cart/cart';
import ProtectedRoute from './components/ProtectedRoute';
import Restaurant from './components/RestaurantDetails/restaurant';
import CartContext from './context/CartContext';
import Profile from './components/Profile/profile';

class App extends Component {
  state = {
    cartList: [],
  };

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachCartItem) => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      }),
    }));
  };

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const productObject = cartList.find((eachCartItem) => eachCartItem.id === id);
    if (productObject.quantity > 1) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachCartItem) => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        }),
      }));
    } else {
      this.removeCartItem(id);
    }
  };

  removeCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter((eachItem) => eachItem.id !== id);
    this.setState({ cartList: updatedCartList });
  };

  addCartItem = (product) => {
    const { cartList } = this.state;
    const isProductPresent = cartList.find((eachItem) => eachItem.id === product.id);

    if (isProductPresent) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((eachItem) => {
          if (eachItem.id === isProductPresent.id) {
            const updatedQuantity = eachItem.quantity + product.quantity;
            return { ...eachItem, quantity: updatedQuantity };
          }
          return eachItem;
        }),
      }));
    } else {
      const updatedCartList = [...cartList, product];
      this.setState({ cartList: updatedCartList });
    }
  };

  render() {
    const { cartList } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/:id"
            element={
              <ProtectedRoute>
                <Restaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
