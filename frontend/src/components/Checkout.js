import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { post_order } from '../actions/delivery'

import Order from './common/Order'

const Checkout = ({post_order}) => {

    const [ data, setData ] = useState({
        city: '',
        adress: '',
        restaurant: window.localStorage.getItem('restaurant'),
        total: JSON.parse(window.localStorage.getItem('total'))
    })
    
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    let meals = cart.map((item) => {
        let id = item.id
        let quantity = item.quantity
        return {
            "item": id,
            "quantity": quantity
        }
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let key = "order"
        let obj = {}
        obj[key] = data

        let array_key = "items"
        let array = []
        array[array_key] = meals

        post_order([data, meals])
        
    }

    const valid_form = data.city && data.adress !== '' ? (
        <button type='submit' className='full_btn'>Confirm order</button>
    ) : (
        <button className='full_btn_d' disabled>Confirm order</button>
    )
    const history = useHistory()
    if(!cart){
        history.pushState('/')
    }
    return (
        <div className='complete_order'>
            <Order />
            <form onSubmit={handleSubmit} className='complete_order_form'>
                <h4 className='text-light p-2'>Your information:</h4>
                <div className='form-group'>
                    <input
                        className='custom_input'
                        name='city'
                        onChange={handleChange}
                        placeholder='City'
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='custom_input'
                        name='adress'
                        onChange={handleChange}
                        placeholder='Adress'
                    />
                </div>
                <div className='form-group'>
                    {valid_form}
                </div>
            </form>
        </div>
    )
}

export default connect(null, {post_order})(Checkout)
