import './header.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import {FaCartArrowDown} from 'react-icons/fa'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import {FaUserCircle} from 'react-icons/fa'

const Header = () => {
  const {cartList} = useContext(CartContext)
  const countFood = cartList.length

  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const gotoCart = () => {
    console.log('cart button clicked')
    navigate('/cart')
  }

  const onClickCart = () => {
    navigate('/cart')
  }

  const gotoHome = () => {
    navigate('/')
  }

  const onClickProfile = () => {
    navigate('/profile')
  }

  const onClickLogo = () => {
    navigate('/')
  }

  return (
    <nav className="nav-container">
      <div className="logo-name" onClick={onClickLogo}>
        <img
          src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1728328974/logo_ohadef.png"
          alt="logo"
          className="header-logo"
        />
        <h3 className="header-heading">Tasty Kitchens</h3>
      </div>

      <div className="navigations">
        <button className="home" onClick={gotoHome}>
          Home
        </button>
        <div className="header-cart-container">
          <div className="cart-icon-container" onClick={onClickCart}>
            <FaCartArrowDown className="cart-icon" />
            <div className="count-foods">
              <p>{countFood}</p>
            </div>
          </div>
          <button className="cart" onClick={gotoCart}>
            Cart
          </button>
        </div>

        <button className="logout" onClick={onClickLogout}>
          Logout
        </button>

        <FaUserCircle className="profile" onClick={onClickProfile} />
      </div>
      <div className="small-navigations">
        <button className="home" onClick={gotoHome}>
          Home
        </button>
        <div className="header-cart-container">
          <div className="cart-icon-container" onClick={onClickCart}>
            <FaCartArrowDown className="cart-icon" />
            <div className="count-foods">
              <p>{countFood}</p>
            </div>
          </div>
          <button className="cart" onClick={gotoCart}>
            Cart
          </button>
        </div>

        <button className="logout" onClick={onClickLogout}>
          Logout
        </button>

        <FaUserCircle className="profile" onClick={onClickProfile} />
      </div>
    </nav>
  )
}

export default Header
