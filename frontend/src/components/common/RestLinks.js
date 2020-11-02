import React from 'react'
import { Link } from 'react-router-dom'

const RestLinks = ({id}) => {
    return (
        <div className='rest_links'>
            <Link
                className='r_link'
                to={`/restaurants/${id}/`}
            >
                Menu
            </Link>
            <Link
                className='r_link'
                to={`/reviews/restaurants/${id}/`}
            >
                Reviews
            </Link>
        </div>
    )
}

export default RestLinks