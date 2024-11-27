import {useState, useEffect} from 'react'
import './slide.css'

const Slides = () => {
  const [activeFrame, setActiveFrame] = useState(0)

  useEffect(() => {
    const frameDuration = setInterval(() => {
      setActiveFrame(prevIndex => (prevIndex + 1) % 3)
    }, 4000)

    return () => clearInterval(frameDuration)
  }, [])

  useEffect(() => {
    // console.log('Active frame:', activeFrame)
  }, [activeFrame])

  return (
    <>
      <div className="slide-main-container">
        <div className="dots-container">
          <div
            className={`frame-dot-${activeFrame === 0 ? 'active' : ''} dots`}
          ></div>
          <div
            className={`frame-dot-${activeFrame === 1 ? 'active' : ''} dots`}
          ></div>
          <div
            className={`frame-dot-${activeFrame === 2 ? 'active' : ''} dots`}
          ></div>
        </div>
        <div
          className="slide-container"
          style={{transform: `translateX(-${activeFrame * 100}%)`}}
        >
          <div className="frame frame-1"></div>
          <div className="frame frame-2"></div>
          <div className="frame frame-3"></div>
        </div>
      </div>
    </>
  )
}

export default Slides
