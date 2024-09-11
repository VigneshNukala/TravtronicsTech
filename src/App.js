import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
class App extends Component {
  state = {cartData: []}

  onClickCartApp = data => {
    this.setState(prevState => ({cartData: [...prevState.cartData, data]}))
  }

  render() {
    const {cartData} = this.state
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/products"
          component={() => <Products onClickCartApp={this.onClickCartApp} />}
        />

        <ProtectedRoute
          exact
          path="/cart"
          component={() => <Cart cartData={cartData} />}
        />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}
export default App
