import './cartitem.css'
import {FaRegMinusSquare, FaRegPlusSquare, FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {itemDetails} = props
      const {id, quantity, cost, image_url, name} = itemDetails
      const onClickDecrement = () => decrementCartItemQuantity(id)
      const onClickIncrement = () => incrementCartItemQuantity(id)
      const onRemoveCartItem = () => removeCartItem(id)
      const totalPrice = cost * quantity

      return (
        <li className="cart-item">
          <div className="cart-food">
            <img src={image_url} alt={name} className="cart-item-image" />
            <h6 className="cart-item-name">{name}</h6>
          </div>
          <div className="cart-item-quantity">
            <FaRegMinusSquare
              className="cart-icon"
              onClick={onClickDecrement}
            />
            <span className="quantity">{quantity}</span>
            <FaRegPlusSquare className="cart-icon" onClick={onClickIncrement} />
          </div>
          <div className="cart-item-cost">
            <FaRupeeSign className="rupee-icon" />
            <span>{totalPrice.toFixed(2)}</span>
          </div>
          <button className="remove-item-btn" onClick={onRemoveCartItem}>
            Remove
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
