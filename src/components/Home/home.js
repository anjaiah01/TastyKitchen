import './home.css'
import Header from '../Header/header'
import Slides from '../Slides/frames'
import AllProducts from '../AllRestaurants/pagination'
import Footer from '../Footer/footer'

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <Slides />
      <AllProducts />
      <Footer />
    </div>
  )
}

export default Home
