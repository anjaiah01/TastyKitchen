import './cart.css'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import CartItem from '../CartItem/cartitem'
import CartContext from '../../context/CartContext'
import {FaRupeeSign} from 'react-icons/fa'
import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const [isOrderPlaced, setOrderPlaced] = useState(false)

  const navigate = useNavigate()
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const showEmptyView = cartList.length === 0
  console.log('cartList', cartList)
  const totalAmount = cartList.reduce((total, eachItem) => {
    return total + eachItem.cost * eachItem.quantity
  }, 0)

  const onClickOrderNow = () => {
    navigate('/',{replace:true})
  }

  const onClickPlaceOrder = () => {
    setOrderPlaced(true)
  }

  const onClickgotoHome = () => {
    navigate('/',{replace:true})
  }

  return (
    <>
      <Header />
      {isOrderPlaced ? (
        <div className="order-placed-container">
          <img
            src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1732799998/check-circle.1_1_dmde1i.png"
            alt="order placed image"
            className="order-placed-image"
          />
          <h4 className="payment-successful-text">Payment Successful</h4>
          <p className="order-placed-para">
            Thank you for ordering <br />
            Your payment is successfully completed.
          </p>
          <button className="go-to-home" onClick={onClickgotoHome}>
            Go to Home Page
          </button>
        </div>
      ) : showEmptyView ? (
        <div className="empty-view-container">
          <img
            src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1732798176/noordersyet_gk7gh1.png"
            alt="no orders yet"
            className="empty-view-image"
          />
          <div className="empty-text-container">
            <h2 className="no-order-yet-text">No Orders yet!</h2>
            <p className="no-order-para">
              Your cart is empty. Add something from the menu.
            </p>
            <button className="order-now-button" onClick={onClickOrderNow}>
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <div className="order-total-container">
              <h4 className="order-total-text">Order total: </h4>
              <div className="total-amount-container">
                <div className="total-amount-sign">
                  <FaRupeeSign className="rupee-sign" />
                  <strong className="total-amount">{totalAmount}</strong>
                </div>

                <button
                  className="place-order-button"
                  onClick={onClickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Cart
