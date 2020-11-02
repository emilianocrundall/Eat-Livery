import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const PrivateManagerRoute = ({auth, user, component:Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if(auth.isAuthenticated){
            if(user && user.isAdmin){
                return <Component {...props} />
            } else {
                return <Redirect to='/' />
            }
        } else {
            return <Redirect to='/register_manager' />
        }
    }} />
    
)

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps)(PrivateManagerRoute)