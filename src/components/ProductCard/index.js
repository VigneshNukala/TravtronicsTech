import './index.css'

const ProductCard = props => {
  const {productData, onClickCart} = props
  const {title, brand, imageUrl, rating, price} = productData
  const onCart = () => {
    onClickCart(productData)
  }
  return (
    <li className="product-item">
      <img src={imageUrl} alt="product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <div className="card">
        <p className="brand">by {brand}</p>
        <button className="cart-button" type="button" onClick={onCart}>
          Add to Cart
        </button>
      </div>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default ProductCard
