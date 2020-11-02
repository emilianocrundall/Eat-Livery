import React from 'react'
import Header from './common/Header'
import CategoriesDash from './common/CategoriesDash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


export const Dashboard = ({auth}) => {
    return (
        <div className='second_cont'>
            <Header title='EatLivery' />
            <CategoriesDash />
            <div className='manage_rest'>
                {!auth.isAuthenticated ? (
                    <Link to='/manage_restaurant' className='dark_ctm_btn'>
                    Manage Restaurant
                </Link>
                ) : null}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)