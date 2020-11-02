import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    get_order_details,
    get_ordered_meals,
    delete_order,
    update_order
} from '../../actions/delivery'
import { Redirect, useParams } from 'react-router-dom'
import moment from 'moment'

const ManageOrder = ({
    order_detail,
    ordered_meals,
    get_order_details,
    get_ordered_meals,
    delete_order,
    update_order
}) => {

    const [ status, setStatus ] = useState({
        status: 1
    })

    const { id } = useParams()
    useEffect(() => {
        get_order_details(id)
        get_ordered_meals(id)
    }, [])

    const format_date = (date) => {
        let new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }

    const acceptOrder = () => {
        update_order(order_detail.id, status)
    }
    const options = [
        {name: 'accepted', status: 1},
        {name: 'cooking', status: 2},
        {name: 'delivered', status: 3},
    ]
    const handleChange = (e) => {
        setStatus({
            ...status,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        update_order(order_detail.id, status)
    }

    if(order_detail === {}){
        return <Redirect to='/check_orders' />
    }
    return (
        <div className='complete_order' id='check'>
            <div className='items_ordered'>
                <h4>Order:</h4>
                {ordered_meals && ordered_meals.length > 0 ? (
                    ordered_meals.map((item) => (
                        <div key={item.id} className='cart_item'>
                            <p>{item.meal}</p>
                            <span>x {item.quantity}</span>
                        </div>
                    ))
                ) : null}
                <div className='total_cart p-2 m-2'>
                    <h5>Total: $ {order_detail.total}</h5>
                </div>
            </div>
            <div className='items_ordered' id='costumer_details'>
                <h4>Costumer Details:</h4>
                <div className='cart_item'>
                    <p>City: {order_detail.city}</p>
                </div>
                <div className='cart_item'>
                    <p>Adress: {order_detail.adress}</p>
                </div>
                <div className='cart_item'>
                    <p>Order date: {format_date(order_detail.date)}</p>
                </div>
                {order_detail.status === null ? (
                    <div className='m-3'>
                        <button onClick={acceptOrder} className='full_btn m-2'>Accept order</button>
                        <button className='full_btn m-2'>Deny order</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='status_form'>
                        {order_detail.status === 1 ? (
                            <p className='p-2'><strong>Order status: Accepted</strong></p>
                        ) : order_detail.status === 2 ? (
                            <p className='p-2'><strong>Order status: Cooking</strong></p>
                        ) : (
                            <p className='p-2'><strong>Order status: Delivered</strong></p>
                        )}
                        <select
                            onChange={handleChange}
                            className='custom_input'
                            name='status'
                            placeholder='Status order'
                        >
                            {options.map((opt, index) => (
                                <option key={index} value={opt.status}>{opt.name}</option>
                            ))}
                        </select>
                        {status.status === 1 ? (
                            <button className='full_btn_d' disabled>
                                Change status
                            </button>
                        ) : (
                            <button className='full_btn'>
                            Change status
                        </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order_detail: state.delivery.order_detail,
    ordered_meals: state.delivery.ordered_meals
})

const mapActionsToProps = {
    get_order_details,
    get_ordered_meals,
    delete_order,
    update_order
}

export default connect(mapStateToProps, mapActionsToProps)(ManageOrder)
