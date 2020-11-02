import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_user_orders } from '../actions/delivery'
import moment from 'moment'
import Header from './common/Header'

const Notifications = ({get_user_orders, user_orders}) => {

    useEffect(() => {
        get_user_orders()
    }, [])

    const format_date = (date) => {
        let new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }
    return (
        <div className='second_cont'>
            <Header title='Orders made' />
            {user_orders && user_orders.length !== 0 ? (
                user_orders.map((order) => (
                    <Link key={order.id} to={`/orders/${order.id}`} className='category_link'>
                        <h6>{order.restaurant}</h6>
                        <h6>{format_date(order.date)}</h6>
                    </Link>
                ))
            ) : (
                <h3 className='text-center p-4'>There's no orders made</h3>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user_orders: state.delivery.user_orders
})

export default connect(mapStateToProps, {get_user_orders})(Notifications)
