import React from 'react'
import { Link } from 'react-router-dom'

export const CategoriesDash = () => {
    return (
        <Link className='dash_link' to='/categories'>
            <img className='img' src='../../../../media/port.jpg' alt='portada' />
            <div>
                <h4>Explore categories</h4>
            </div>        
        </Link>
    )
}

export default CategoriesDash