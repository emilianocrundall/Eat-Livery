import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../common/Header'
import { get_own_restaurant } from '../../actions/delivery'
import Table from './Table'
import LoaderSM from './LoaderSM'

export const Manager = ({
    auth,
    loading,
    get_own_restaurant,
    own_restaurant }) => {

    useEffect(() => {
        get_own_restaurant()
    }, [])

    if(!own_restaurant){
        return <Redirect to='/register_restaurant' />
    }
    if(loading){
        return <LoaderSM />
    }
    return (
        <div className='manage_cont'>
            <Header title={own_restaurant.name} />
            <Table />
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    own_restaurant: state.delivery.own_restaurant,
    loading: state.delivery.loading
})

export default connect(mapStateToProps, { get_own_restaurant })(Manager)
