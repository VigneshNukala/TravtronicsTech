import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Products = props => {
  const {onClickCartApp} = props

  return (
    <>
      <Header />
      <div className="product-sections">
        <PrimeDealsSection onClickCartApp={onClickCartApp} />
        <AllProductsSection onClickCartApp={onClickCartApp} />
      </div>
    </>
  )
}
export default Products
