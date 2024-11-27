import './pagination.css'
import {MdSort} from 'react-icons/md'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Card from '../Card/card'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [activePage, setActivePage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      //console.log('pagination: ', jwtToken)
      try {
        const limit = 9
        const offset = (activePage - 1) * limit
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )
        const data = await response.json()
        //console.log(data)
        if (response.ok) {
          setProducts(
            data.restaurants.map(resta => ({
              name: resta.name,
              cuisine: resta.cuisine,
              id: resta.id,
              imageUrl: resta.image_url,
              rating: resta.user_rating.rating,
              totalRatings: resta.user_rating.total_reviews,
            })),
          )
        } else {
          console.log(
            'Response is not okay:',
            response.status,
            response.statusText,
          )
        }
      } catch (e) {
        console.log('Error in fetching data:', e)
      }
    }
    fetchData()
  }, [activePage]) // Add activePage as a dependency if it should re-fetch on page change

  // Pagination Logic
  const lastIndex = activePage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currProducts = products.slice(firstIndex, lastIndex)

  // Calculate total pages
  const totalPages = Math.ceil(products.length)

  const goToNextPage = () =>
    setActivePage(prev => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setActivePage(prev => Math.max(prev - 1, 1))
  // console.log('Products: ', products)

  return (
    <div>
      <div className="all-restaurants-header">
        <h1 className="popular-restaurants">Popular Restaurants</h1>
        <div className="text-sortby-container">
          <p className="popular-restaurants-text">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sorting-container">
            <MdSort />
            <p>Sort</p>
          </div>
        </div>
      </div>

      {/* Display paginated items */}
      {products.length > 0 ? (
        <ul className="all-restaurants-container">
          {currProducts.map(item => (
            <Card key={item.id} RestaurantCard={item} />
          ))}
        </ul>
      ) : (
        <p>Loading items...</p>
      )}

      {/* Pagination Controls */}
      <div>
        <button onClick={goToPrevPage} disabled={activePage === 1}>
          Previous
        </button>
        <span>
          {' '}
          Page {activePage} of {totalPages}{' '}
        </span>
        <button onClick={goToNextPage} disabled={activePage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default AllProducts
