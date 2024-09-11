import Header from '../Header'
import './index.css'

const Cart = props => {
  const {cartData} = props
  const checked = false
  return (
    <>
      <Header />
      {cartData.length === 0 ? (
        <div className="cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
            alt="cart"
            className="cart-img"
          />
        </div>
      ) : (
        <div className="cart-con">
          <ul className="cart-list-container">
            {cartData.map(each => (
              <li className="product-item">
                <img src={each.imageUrl} alt="product" className="thumbnail" />
                <h1 className="title">{each.title}</h1>
                <p className="brand">by {each.brand}</p>
                <div className="product-details">
                  <p className="price">Rs {each.price}/-</p>
                  <div className="rating-container">
                    <p className="rating">{each.rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="check-out" type="button">
            CheckOut
          </button>
        </div>
      )}
      )
    </>
  )
}
export default Cart
