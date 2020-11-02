import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_categories } from '../actions/delivery'
import Header from './common/Header'
import LoaderSM from './manager/LoaderSM'

export const Categories = ({categories, get_categories, loading}) => {

    useEffect(() => {
        get_categories()
    }, [])

    if(loading){
        return <LoaderSM />
    }
    return (
        <div className='second_cont'>
            <Header title='Categories' />
            {categories.length !== 0 ? (
                categories.map((cat) => (
                    <Link
                        className='category_link'
                        key={cat.id}
                        to={`/categories/${cat.id}`}
                    >
                        {cat.name}
                    </Link>
                ))
            ) : (
                <h3 className='text-center'>
                    There's no categories yet!
                </h3>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.delivery.categories,
    loading: state.delivery.loading
})

export default connect(mapStateToProps, { get_categories })(Categories)
