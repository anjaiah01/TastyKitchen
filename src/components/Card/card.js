import './card.css'
import {FaStar} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'

const Card = props => {
  const navigate = useHistory()

  const {RestaurantCard} = props
  const {name, cuisine, id, imageUrl, rating, totalRatings} = RestaurantCard

  const onClickRestaraunt = () => {
    navigate.push(`/restaurant/${id}`)
  }

  return (
    <li className="card-container" onClick={onClickRestaraunt}>
      <div className="image-container">
        <img src={imageUrl} alt="Restaurant" className="card-image" />
      </div>
      <div className="content-container">
        <span className="card-name">{name}</span>
        <p className="card-cuisine">{cuisine}</p>
        <div className="rating-container">
          <FaStar className="star-icon" />
          <p className="rating-number">{rating}</p>
          <p className="total-ratings">
            {'( '}
            {totalRatings}
            {' ratings )'}
          </p>
        </div>
      </div>
    </li>
  )
}
export default Card
