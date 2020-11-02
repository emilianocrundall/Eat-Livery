import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'

export const MyOrder = (props) => {

    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        window.localStorage.setItem('cart', JSON.stringify(props.cart))
        window.localStorage.setItem('total', JSON.stringify(props.total))
        window.localStorage.setItem('restaurant', JSON.stringify(props.restaurant))
        history.push('/checkout')
    }
    return (
        <div className='order_details' style={props.show ? props.style : null}>
            <div className='order_header'>
                <h4>Your Order</h4>
            </div>
            <form onSubmit={onSubmit}>
                {props.cart && props.cart.lenght !== 0 ? (
                    props.cart.map((meal) => (
                        <div key={meal.id} className='cart_item'>
                            <p>{meal.name}</p>
                            <span>x {meal.quantity}</span>
                        </div>
                    ))
                ) : null}
                <div className='total'>
                    <p>Total: </p>
                    {props.total ? (
                        <h4>$ {props.total}</h4>
                    ) : null}
                </div>
                <div className='checkout'>
                    {props.total && props.total !== 0 ? (
                        <button type='submit' className='full_btn'>
                            Order
                        </button>
                    ) : (
                        <button className='full_btn_d' disabled>
                            Order
                        </button>
                    )}
                </div>
            </form>
            <button onClick={props.onHide} className='cart_button'><ArrowLeft /></button>
        </div>
    )
}

export default MyOrder