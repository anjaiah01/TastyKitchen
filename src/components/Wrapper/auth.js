import './index.css'
import {useEffect} from 'react'

const Wrapper = input => {
  useEffect(() => {
    console.log(input)
  }, [input])

  return (
    <div className="main-container">
      <div className="mobile-image-container">
        <img
          src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1728361448/smalldevice_csep9f.png"
          alt="website-image"
          className="mobile-image"
        />
        <h1 className="mobile-heading">{input.title}</h1>
      </div>
      <div className="login-cred-container">
        <div className="website-logo">
          <img
            src="https://res.cloudinary.com/dt4w3q95b/image/upload/v1728328974/logo_ohadef.png"
            alt="logo"
            className="logo"
          />
          <h3 className="tasty-kitchen-heading">Tasty Kitchens</h3>
        </div>
        <h1 className="title">{input.title}</h1>
        {input.children}
      </div>
      <div className="kitchen-image"></div>
    </div>
  )
}
export default Wrapper
