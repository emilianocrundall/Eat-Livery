import React from 'react'
import { CartXFill } from 'react-bootstrap-icons'

const NotFound = () => {
    return (
        <div className='second_cont'>
            <div className='not_found'>
                <CartXFill className='my-4 not_found_icon'/>
                <h3 className='text-center'>Sorry, page not found</h3>
            </div>
            
        </div>
    )
}

export default NotFound
