import './home.css'
import Header from '../Header/header'
import Carousel from '../Carousels/carousels'
import AllRestaurants from '../AllRestaurants/allrestaurants'
import Footer from '../Footer/footer'

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Carousel />
      <AllRestaurants />
      <Footer />
    </div>
  )
}

export default Home
