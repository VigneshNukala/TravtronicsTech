import './index.css'

const SimilarProductItem = props => {
  const {details} = props

  const {
    id,
    imageUrl,
    title,
    price,
    description,
    brand,
    totalReviews,
    rating,
    availability,
  } = details
  return (
    <li className="list-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <p className="similar-para1">{title}</p>
      <p className="similar-para2">by {brand}</p>
      <div className="price-card">
        <p className="similar-para1">{price}</p>
        <div className="details-rating">
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="rating-image"
          />
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
