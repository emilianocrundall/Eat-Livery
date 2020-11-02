import React from 'react'
import { Clock, Star, StarFill } from 'react-bootstrap-icons'

const RestInfo = ({restaurant}) => {
    return (
        <div className='rest_info'>
            <nav>
                <ul>
                    <li>
                        <Clock className='icon' />
                        <span>
                            {restaurant.open_hour}
                            hs - {restaurant.close_hour} hs
                        </span>
                    </li>
                    {restaurant.rating > 0 ? (
                        <li>
                            <StarFill className='icon' />
                            <span> {parseFloat(restaurant.rating).toFixed(1)}</span>
                        </li>
                    ) : (
                        <li>
                            <Star className='icon' />
                            <span>There's no reviews yet!</span>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default RestInfo
