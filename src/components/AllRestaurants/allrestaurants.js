import {useState, useEffect} from 'react'
import {Circles} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import RestaurantItems from '../RestaurantItems/index'
import RestaurantsHeader from '../RestaurantsHeader/restaurantheader'
import {FaFrownOpen} from 'react-icons/fa'

import './allrestaurants.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const AllRestaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [activePage, setActivePage] = useState(1)
  const [limit] = useState(9)
  const [activeSortByOption, setActiveSortByOption] = useState(
    sortByOptions[1].value,
  )
  const [input, setsearchRestaurant] = useState('')

  useEffect(() => {
    getRestaurantsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, activeSortByOption, input])

  const getRestaurantsList = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const restaurantsListApi = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortByOption}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsListApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants
        .map(eachItem => ({
          hasOnlineDelivery: eachItem.has_online_delivery,
          userRating: {
            ratingText: eachItem.user_rating.rating_text,
            ratingColor: eachItem.user_rating.rating_color,
            totalReviews: eachItem.user_rating.total_reviews,
            rating: eachItem.user_rating.rating,
          },
          name: eachItem.name,
          hasTableBooking: eachItem.has_table_booking,
          isDeliveringNow: eachItem.is_delivering_now,
          costForTwo: eachItem.cost_for_two,
          cuisine: eachItem.cuisine,
          imageUrl: eachItem.image_url,
          id: eachItem.id,
          menuType: eachItem.menu_type,
          location: eachItem.location,
          opensAt: eachItem.opens_at,
          groupByTime: eachItem.group_by_time,
        }))
        .filter(
          restaurant =>
            restaurant.name.toLowerCase().includes(input.toLowerCase()), // case-insensitive search
        )

      setRestaurantsList(updatedData)
      setApiStatus(apiStatusConstants.success)
    }
    console.log(input)
  }

  const renderLoader = () => (
    <div testid="restaurants-list-loader" className="restaurants-loader">
      <Circles type="Oval" color="#F7931E" width="100%" height="100%" />
    </div>
  )

  const renderRestaurantsList = () => (
    <>
      <div className="all-restaurants-empty-container">
        {restaurantsList.length > 0 ? (
          <ul className="restaurants-unorderedList">
            {restaurantsList.map(eachItem => (
              <RestaurantItems key={eachItem.id} itemDetails={eachItem} />
            ))}
          </ul>
        ) : (
          <div className="no-restaurants-container">
            <FaFrownOpen className="sorry" />
            <h4 className="sorry-text">Sorry! No Restaurants </h4>
          </div>
        )}
      </div>
      <div className="pagination-div">
        <button
          type="button"
          className="page-button"
          onClick={() => activePage > 1 && setActivePage(prev => prev - 1)}
          testid="pagination-left-button"
        >
          <IoIosArrowBack />
        </button>

        <p className="page-number">
          <span testid="active-page-number">{activePage}</span> of 4
        </p>

        <button
          type="button"
          className="page-button"
          testid="pagination-right-button"
          onClick={() => activePage < 4 && setActivePage(prev => prev + 1)}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  )

  const renderPageBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderRestaurantsList()
      default:
        return null
    }
  }

  return (
    <div className="restaurants-container">
      <RestaurantsHeader
        sortByOptions={sortByOptions}
        activeSortByOption={activeSortByOption}
        onChangeSortByOptions={option => setActiveSortByOption(option)}
        onChangeSearchResult={input => setsearchRestaurant(input)}
      />
      {renderPageBasedOnApiStatus()}
    </div>
  )
}

export default AllRestaurants
