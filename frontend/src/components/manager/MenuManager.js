import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { add_meal } from '../../actions/delivery'
import { Bell, PlusCircle, Power, HouseDoor } from 'react-bootstrap-icons'
import ModalAddMeal from './ModalAddMeal'

export const MenuManager = ({logout, add_meal}) => {
    const [ show, setShow ] = useState(false)
    return (
        <React.Fragment>
        <nav>
            <ul>
                <li>
                    <Link to='/manage_restaurant' className='nav_link'>
                        <HouseDoor />
                    </Link>
                </li>
                <li>
                    <Link to='/check_orders' className='nav_link'>
                        <Bell />
                    </Link>
                </li>
                <li>
                    <button className='nav_link' onClick={() => setShow(true)}>
                        <PlusCircle />
                    </button>
                </li>
                <li>
                    <button onClick={() => logout()} className='nav_link'>
                        <Power />
                    </button>
                </li>
            </ul>
        </nav>
        <ModalAddMeal
            show={show}
            onHide={() => setShow(false)}
            add_meal={add_meal}
        />
        </React.Fragment>
    )
}

export default connect(null, {logout, add_meal})(MenuManager)
