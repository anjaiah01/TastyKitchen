import './profile.css'
import {IoChevronBackCircleOutline} from 'react-icons/io5'
import {FaCartArrowDown} from 'react-icons/fa'
import {useContext} from 'react'
import {FaUserCircle} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {IoCall} from 'react-icons/io5'
import {RiCoinsFill} from 'react-icons/ri'
import CartContext from '../../context/CartContext'
import Cookies from 'js-cookie'

const Profile = props => {
  const navigate = useNavigate()
  const onClickBack = () => {
    navigate('/')
  }
  const {cartList} = useContext(CartContext)
  const countFood = cartList.length

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const gotoCart = () => {
    console.log('cart button clicked')
    navigate('/cart')
  }
  return (
    <div className="profile-container">
      <div className="user-offer-container">
        <div className="user-container">
          <div className="profile-header">
            <div className="account-back-container">
              <IoChevronBackCircleOutline
                onClick={onClickBack}
                className="back-button"
              />
              <h4 className="account-text">ACCOUNT</h4>
            </div>
            <div className="profile-cart-container">
              <div className="cart-icon-container" onClick={gotoCart}>
                <FaCartArrowDown className="cart-in-profile" />
                <div className="count-foods-profile">
                  <p>{countFood}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="user-details">
            <FaUserCircle className="user" />
            <strong className="user-name">Anji Golla</strong>
          </div>
          <div className="help-coins-container">
            <div className="help-center-container">
              <IoCall className="call" />
              <p className="help-center-text">Help Center</p>
            </div>
            <div className="super-coins-container">
              <p className="super-coins-text">Super Coins</p>
              <RiCoinsFill className="coins" />
            </div>
          </div>

          <div className="history-container">
            <div className="activity-container">
              <h5 className="history-head">My Activity</h5>
              <div>
                <p className="text">My Orders</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Referal Id</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Returns & Refunds</p>
              </div>
            </div>
            <div className="activity-container">
              <h5 className="history-head">Details</h5>
              <div>
                <p className="text">Bank & UPI Details</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Change Address</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Rate US</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Legal and Polices</p>
                <hr className="profile-line" />
              </div>
              <div>
                <p className="text">Logout</p>
              </div>
            </div>
          </div>
        </div>
        <div className="offer-container">
          <img
            src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1732901426/Yellow_Black_Modern_Special_Offer_Food_Promo_Instagram_Post_t7azkr.png"
            alt="profile-food"
            className="offer-image"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
