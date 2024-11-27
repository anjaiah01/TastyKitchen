import './footer.css'
import {FaPinterestP} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaFacebook} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="inner-container">
        <div className="tasty-kitchens">
          <img
            src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1731253858/footer-logo_eaixna.png"
            alt="logo"
            className="footer-logo"
          />
          <h3 className="footer-heading">Tasty Kitchens</h3>
        </div>
        <p>The only thing we are serious about is food.</p>
        <p>Contact Us On</p>
        <div className="icons-container">
          <FaPinterestP className="footer-icon" />
          <FaInstagram className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaFacebook className="footer-icon" />
        </div>
      </div>
    </div>
  )
}

export default Footer
