import './cart.css'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import CartItem from '../CartItem/cartitem'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      console.log('cartList', cartList)
      return (
        <>
          <Header />
          <div className="cart-container">
            <div className="cart-headers">
              <div className="cart-header-item">Item</div>
              <div className="cart-header-quantity">Quantity</div>
              <div className="cart-header-price">Price</div>
            </div>
            <ul className="cart-items-container">
              {cartList.map(item => (
                <CartItem key={item.id} itemDetails={item} />
              ))}
            </ul>
            <hr className="line" />
          </div>

          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
