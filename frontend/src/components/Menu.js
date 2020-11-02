import React from 'react'
import { connect } from 'react-redux'
import { withRouter, useLocation } from 'react-router-dom'
import Loader from './common/Loader'
import MenuManager from './manager/MenuManager'
import MenuUser from './common/MenuUser'

export const Menu = ({auth, user, loading}) => {
    
    const loc = useLocation();

    if(auth.isAuthenticated && loading){
        return <Loader />
    }
    if(
        loc.pathname.match(/register/)
        || loc.pathname.match(/login/)
        || loc.pathname.match(/register_manager/)
        || loc.pathname.match(/register_restaurant/)
        || loc.pathname.match(/checkout/)
    ){
        return null
    }
    return (
        <div className='side_menu'>
            {user && user.isAdmin ? (
                <MenuManager />
            ) : (
                <MenuUser />
            )}
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    loading: state.auth.loading,
    user: state.auth.user
})

const MenuWithRouter = withRouter(Menu)

export default connect(mapStateToProps)(MenuWithRouter)
