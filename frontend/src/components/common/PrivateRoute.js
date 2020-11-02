import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import LoaderSM from '../manager/LoaderSM'

const PrivateRoute = ({loading, auth, component:Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if(loading){
            return <LoaderSM />
        }else if(!auth.isAuthenticated){
            return <Redirect to='/' />
        } else{
            return <Component {...props} />
        }
    }}
    />
)
const mapStateToProps = (state) => ({
    auth: state.auth,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(PrivateRoute)
