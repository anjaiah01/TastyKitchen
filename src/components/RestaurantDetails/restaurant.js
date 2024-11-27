import './restaurant.css'
import {FaStar} from 'react-icons/fa'
import {FaRupeeSign} from 'react-icons/fa'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import FoodItem from '../FoodItem/fooditem'

const Restaurant = () => {
  const {id} = useParams() // Get id from URL
  const jwtToken = Cookies.get('jwt_token')
  const [restaurantDetails, setRestaurantDetails] = useState([])
  const [foodItems, setfoodItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const data = await response.json()

          const restaurantDet = {
            costForTwo: data.cost_for_two,
            cuisine: data.cuisine,
            id: data.id,
            imageUrl: data.image_url,
            itemsCount: data.items_count,
            location: data.location,
            name: data.name,
            opensAt: data.opens_at,
            rating: data.rating,
            reviewsCount: data.reviews_count,
          }

          setRestaurantDetails(restaurantDet)
          const allItems = data.food_items
          console.log('all items:', allItems)
          const items = {
            cost: allItems.cost,
            foodType: allItems.food_type,
            id: allItems.id,
            imageUrl: allItems.image_url,
            name: allItems.name,
            rating: allItems.rating,
          }

          setfoodItems(data.food_items)
          console.log('restaurant details: ', restaurantDetails)
          console.log('Food Items: ', foodItems)
        } else {
          const errorData = await response.json()
          setError(errorData.error_msg || 'Failed to fetch restaurant details')
        }
      } catch (e) {
        setError('Something went wrong')
        console.error(e)
      }
    }

    fetchRestaurantDetails()
  }, [id, jwtToken]) // Add dependencies for proper re-fetching

  if (error) {
    return <p className="error-message">{error}</p>
  }

  return (
    <>
      <Header />
      <div className="single-restaurant-container">
        <div className="restainer-header-container">
          <div className="inside-header">
            <img
              src={restaurantDetails.imageUrl}
              alt="image"
              className="single-restaurant-image"
            />
            <div className="content">
              <div>
                <h4 className="restaurant-name">{restaurantDetails.name}</h4>
                <p className="restaurant-cuisine">
                  {restaurantDetails.cuisine}
                </p>
                <p className="restaurant-location">
                  {restaurantDetails.location}
                </p>
                <div className="rating-cost-container">
                  <div className="two-text">
                    <div className="head-text">
                      <FaStar />
                      <span className="icon-label">
                        {restaurantDetails.rating}
                      </span>
                    </div>
                    <p className="restaurant-text">
                      {restaurantDetails.reviewsCount}+ ratings
                    </p>
                  </div>
                  <div className="two-text">
                    <div className="head-text">
                      <FaRupeeSign />
                      <span className="icon-label">
                        {restaurantDetails.costForTwo}
                      </span>
                    </div>
                    <p className="restaurant-text">Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(item => (
            <FoodItem key={item.id} itemDetails={item} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default Restaurant
