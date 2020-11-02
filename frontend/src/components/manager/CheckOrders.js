import React, { useEffect } from 'react'
import { ArrowRight } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_rest_orders, get_own_restaurant } from '../../actions/delivery'
import Header from '../common/Header'
import moment from 'moment'

const CheckOrders = ({
    orders_rest,
    own_restaurant,
    get_rest_orders,
    get_own_restaurant
}) => {

    useEffect(() => {
        get_own_restaurant()
        if(own_restaurant  && own_restaurant.id){
            get_rest_orders(own_restaurant.id)
        }
    }, [own_restaurant.id])

    const format_date = (date) => {
        let new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }
    return (
        <div className='manage_cont'>
            <Header title='Orders' />
            {orders_rest && orders_rest.length > 0 ? (
                orders_rest.map((order) => (
                    <Link className='category_link' key={order.id} to={`/manage_order/${order.id}`}>
                        <ArrowRight /> {format_date(order.date)}
                    </Link>
                ))
            ) : <h3 className='p-3 text-center'>There's no orders yet</h3>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    orders_rest: state.delivery.orders_rest,
    own_restaurant: state.delivery.own_restaurant
})

export default connect(mapStateToProps, {get_rest_orders, get_own_restaurant})(CheckOrders)
