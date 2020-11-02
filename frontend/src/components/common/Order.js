import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const Order = () => {
    const order = JSON.parse(window.localStorage.getItem('cart'))
    const total = JSON.parse(window.localStorage.getItem('total'))

    const history = useHistory()
    const handleClick = () => {
        window.localStorage.removeItem('cart')
        window.localStorage.removeItem('total')
        window.localStorage.removeItem('restaurant')
        history.goBack()
    }

    if(!order){
        return <Redirect to='/' />
    }
    return (
        <div className='items_ordered'>
            <h4 className='p-2'>Your Order: </h4>
            {order.length > 0 ? (
                order.map((item) => (
                    <div key={item.id} className='cart_item'>
                        <p>{item.name}</p>
                        <span>x {item.quantity}</span>
                    </div>
                ))
            ) : null}
            <div className='total_cart p-2 m-2'>
                <h5>Total: $ {total}</h5>
            </div>
            <button onClick={handleClick} className='full_btn'>Cancel</button>
        </div>
    )
}

export default Order
