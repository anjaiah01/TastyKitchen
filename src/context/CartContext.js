import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increamentCartItemQuantity: () => {},
  decreamentCartQuantity: () => {},
})

export default CartContext
