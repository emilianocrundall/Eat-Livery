import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get_category, get_rest_by_cat } from '../actions/delivery'
import Header from './common/Header'
import LoaderSM from './manager/LoaderSM'

const Category = ({
    loading,
    category,
    rest_by_category, 
    get_rest_by_cat,
    get_category}) => {

    const { id } = useParams()
    useEffect(() => {
        get_category(id)
        get_rest_by_cat(id)
    }, [])

    if(loading){
        return <LoaderSM />
    }
    return (
        <div className='second_cont'>
            {category ? (
                <Header title={category.name} />
            ) : null}
            {rest_by_category.length !== 0 ? (
                rest_by_category.map((rest) => (
                    <Link
                        className='rest_link'
                        key={rest.id}
                        to={`/restaurants/${rest.id}`}
                    >
                        <img src={rest.image} alt={rest.image}/>
                        <p>{rest.name}</p>
                    </Link>
                ))
            ) : (
                <h3 className='text-center p-3'>
                    Seems like there's no restaurants for this category
                </h3>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.delivery.loading,
    category: state.delivery.category,
    rest_by_category: state.delivery.rest_by_category
})

const mapActionsToProps = {get_category, get_rest_by_cat}

export default connect(mapStateToProps, mapActionsToProps)(Category)
