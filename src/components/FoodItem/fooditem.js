import './fooditem.css'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import {FiMinusSquare} from 'react-icons/fi'
import {FiPlusSquare} from 'react-icons/fi'

import {useState, useContext, useEffect} from 'react'
import CartContext from '../../context/CartContext'

const FoodItem = props => {
  const {
    cartList,
    addCartItem,
    removeCartItem,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
  } = useContext(CartContext)
  const [isFirst, setIsFirst] = useState(true)
  const [foodCount, setfoodCount] = useState(1)
  const {itemDetails} = props
  const {cost, food_type, id, image_url, name, rating} = itemDetails

  useEffect(() => {
    const foodItemInCart = cartList.find(cartItem => cartItem.id === id)
    if (foodItemInCart) {
      setfoodCount(foodItemInCart.quantity)
      setIsFirst(false) // Item is already in the cart
    }
  }, [cartList, id])

  const onClickAddBtn = () => {
    setIsFirst(false)

    addCartItem({...itemDetails, quantity: foodCount})
  }

  const onIncreament = () => {
    setfoodCount(foodCount + 1)
    incrementCartItemQuantity(id)
  }
  const onDecreament = () => {
    if (foodCount > 1) {
      setfoodCount(foodCount - 1)
      decrementCartItemQuantity(id)
    } else {
    }
  }

  return (
    <li className="food-item-container">
      <img src={image_url} alt="food item" className="food-item-image" />
      <div className="food-item-content">
        <div className="food-item-content-container">
          <p>{name}</p>
          <div className="food-cost">
            <FaRupeeSign className="rupee" />
            <span className="food-item-cost">{cost}</span>
          </div>
          <div className="food-rating">
            <FaStar className="star-rating" />
            <span className="food-item-rating">{rating}</span>
          </div>
          <div className="food-item-btn">
            {foodCount == 1 ? (
              <button className="food-item-add-button" onClick={onClickAddBtn}>
                ADD
              </button>
            ) : (
              <div className="food-quantity-container">
                <FiMinusSquare onClick={onDecreament} />
                <p className="food-count-text">{foodCount}</p>
                <FiPlusSquare onClick={onIncreament} />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default FoodItem
