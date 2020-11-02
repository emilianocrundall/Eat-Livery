import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { get_menu, delete_meal, update_meal } from '../../actions/delivery'
import ModalDeleteMeal from './ModalDeleteMeal'
import ModalUpdateMeal from './ModalUpdateMeal'

export const Table = ({
    food_by_rest,
    own_restaurant,
    get_menu,
    delete_meal,
    update_meal}) => {

    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [current_id, setId] = useState(false)

    useEffect(() => {
        if(own_restaurant && own_restaurant.id){
            get_menu(own_restaurant.id)
        }
    }, [own_restaurant.id])

    return (
        <React.Fragment>
        <table className='ctm_table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {food_by_rest.length === 0 ? (
                null
            ) : (
                <tbody>
                {food_by_rest.map((meal) => (
                    <tr key={meal.id}>
                        <td>{meal.id}</td>
                        <td>{meal.name}</td>
                        <td>$ {meal.price}</td>
                        <td width='150'>
                            <img
                                className='td_img'
                                src={meal.image}
                                alt={meal.image} />
                        </td>
                        <td>
                            <button
                                onClick={() => {
                                    setId(meal.id)
                                    setShowUpdate(true);
                                }}
                                className='meal_action'>
                                <PencilSquare />
                            </button>
                            <button
                                onClick={() => {
                                    setShowDelete(true);
                                    setId(meal.id)
                                }}
                                className='meal_action'>
                                <Trash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            )}
        </table>
        {food_by_rest.length === 0 ? (
            <h3 className='text-center p-4'>You have no meals yet!</h3>
        ) : null}
        <ModalDeleteMeal
            show={showDelete}
            onHide={() => setShowDelete(false)}
            delete_meal={delete_meal}
            id={current_id}
        />
        <ModalUpdateMeal
            show={showUpdate}
            onHide={() => setShowUpdate(false)}
            update_meal={update_meal}
            id={current_id}
        />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    food_by_rest: state.delivery.food_by_rest,
    own_restaurant: state.delivery.own_restaurant,
})
const mapActionToProps = {
    get_menu,
    delete_meal,
    update_meal
}

export default connect(mapStateToProps, mapActionToProps)(Table)
