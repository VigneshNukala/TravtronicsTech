import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: [],
    apiStatus: apiStatusConstants.initial,
    similarProductsData: [],
    count: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
          title: each.title,
          style: each.style,
          price: each.price,
          description: each.description,
          brand: each.brand,
          totalReviews: each.total_reviews,
          rating: each.rating,
          availability: each.availability,
        })),
      }
      console.log(updatedData.similarProducts)
      this.setState({
        productData: updatedData,
        similarProductsData: updatedData.similarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else this.setState({apiStatus: apiStatusConstants.failure})
  }

  renderLoading = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailure = () => (
    <div className="failure-bg">
      <Header />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-head">Product Not Found</h1>
      <button
        className="cart-btn"
        type="button"
        onClick={this.onContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  onDecrease = () => {
    const {count} = this.state
    if (count !== 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  renderSuccess = () => {
    const {productData, similarProductsData, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productData
    return (
      <div>
        <Header />
        <div className="product-details-bg">
          <div className="product-details-middle">
            <img src={imageUrl} alt="product" className="product-item-img" />
            <div className="product-item-details">
              <h1 className="details-heading">{title}</h1>
              <p className="details-price">{price}/-</p>
              <div className="details-card">
                <div className="details-rating">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="rating-image"
                  />
                  <p>{rating}</p>
                </div>
                <p className="details-review">{totalReviews}</p>
              </div>
              <p className="details-description">{description}</p>
              <p className="details-availability">Available: {availability}</p>
              <p className="details-brand">Brand: {brand}</p>
              <hr />
              <div className="change">
                <button
                  className="btn"
                  type="button"
                  onClick={this.onDecrease}
                  data-testid="minus"
                >
                  <BsDashSquare role="button" />
                </button>
                <p className="count">{count}</p>
                <button
                  className="btn"
                  type="button"
                  onClick={this.onIncrease}
                  data-testid="plus"
                >
                  <BsPlusSquare role="button" />
                </button>
              </div>
              <button className="cart-btn">ADD TO CART</button>
            </div>
          </div>
          <h1 className="similar-heading">Similar Prodcuts</h1>
          <ul className="list-container">
            {similarProductsData.map(item => (
              <SimilarProductItem details={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }
}

export default ProductItemDetails
