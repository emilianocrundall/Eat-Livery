import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/styles.css'
import { load_user } from './actions/auth'
import PrivateRouteManager from './components/common/PrivateManagerRoute'
import PrivateRoute from './components/common/PrivateRoute'
import Dashboard from './components/Dashboard'
import Menu from './components/Menu'
import Register from './components/Register'
import Login from './components/Login'
import Categories from './components/Categories'
import Manager from './components/manager/Manager'
import RegRestaurant from './components/manager/RegRestaurant'
import Category from './components/Category'
import Restaurant from './components/Restaurant'
import ReviewsRest from './components/ReviewsRest'
import Notifications from './components/Notifications'
import Checkout from './components/Checkout'
import OrderCheck from './components/OrderCheck'
import CheckOrders from './components/manager/CheckOrders'
import ManageOrder from './components/manager/ManageOrder'
import SearchRest from './components/SearchRest'
import NotFound from './components/common/NotFound'

export const App = () => {

    useEffect(() => {
        store.dispatch(load_user()); 
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <div className='app_container'>
                    <Menu />
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/register_manager' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/categories' component={Categories} />
                        <Route exact path='/categories/:id' component={Category} />
                        <Route exact path='/restaurants/:id' component={Restaurant} />
                        <Route exact path='/search' component={SearchRest} />
                        <Route exact path='/reviews/restaurants/:id' component={ReviewsRest} />
                        <PrivateRoute exact path='/notifications' component={Notifications} />
                        <PrivateRoute exact path='/checkout' component={Checkout} />
                        <PrivateRoute exact path='/orders/:id' component={OrderCheck} />
                        <PrivateRouteManager exact path='/register_restaurant' component={RegRestaurant} />
                        <PrivateRouteManager exact path='/manage_restaurant' component={Manager} />
                        <PrivateRouteManager exact path='/check_orders' component={CheckOrders} />
                        <PrivateRouteManager exact path='/manage_order/:id' component={ManageOrder} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}
