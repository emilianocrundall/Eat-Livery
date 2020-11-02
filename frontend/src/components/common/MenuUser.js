import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HouseDoor, Search, PersonCircle, Power, Bell } from 'react-bootstrap-icons'
import ModalUser from '../common/ModalUser'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

export const MenuUser = ({auth, logout}) => {

    const [show, setShow] = useState(false)

    return (
        <React.Fragment>
            <nav>
                <ul>
                    <li>
                        <Link to='/' className='nav_link'>
                            <HouseDoor />
                        </Link>
                    </li>
                    <li>
                        <Link to='/search' className='nav_link'>
                            <Search />
                        </Link>
                    </li>
                    
                    {auth.isAuthenticated ? (
                        <React.Fragment>
                        <li>
                            <Link to='/notifications' className='nav_link'>
                                <Bell />
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => logout()} className='nav_link'>
                                <Power />
                            </button>
                        </li>
                        </React.Fragment>
                    ) : (
                        <li>
                            <button onClick={() => setShow(true)} className='nav_link'>
                                <PersonCircle />
                            </button>
                        </li>
                    )}
                    
                </ul>
            </nav>
            {auth.isAuthenticated ? (
                null
            ) : (
                <ModalUser show={show} onHide={() => setShow(false)} />
            )}
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(MenuUser)