import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { get_categories, reg_rest, post_category } from '../../actions/delivery'
import ModalAddCategory from './ModalAddCategory'

export const RegRestaurant = ({
    user,
    own_restaurant,
    categories,
    get_categories,
    reg_rest,
    post_category}) => {

    const [ data, setData ] = useState({
        name: "",
        category: "1",
        open_hour: "",
        close_hour: "",
        image: ""
    })
    const [ show, setShow ] = useState(false)

    useEffect(() => {
        get_categories()
    }, [])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handlePhoto = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append('name', data.name)
        form.append('category', data.category)
        form.append('open_hour', data.open_hour)
        form.append('close_hour', data.close_hour)
        form.append('image', data.image, data.image.name)
        reg_rest(form)
    }
    if(user && user.isAdmin){
        if(own_restaurant){
            return <Redirect to='/manage_restaurant' />
        }
    }
    const valid_form = data.name
    && data.category
    && data.open_hour
    && data.close_hour
    && data.image !== '' ? (
        <button className='full_btn'>Save</button>
    ) : <button className='full_btn_d' disabled>Save</button>

    return (
        <div className='form_container'>
            <form className='form_body' onSubmit={handleSubmit}>
            <h3 className='text-center text-light p-2'>Register Restaurant</h3>
                <div className='form-group'>
                    <label>Name</label>
                    <input
                        id='with_label'
                        type='text'
                        className='custom_input'
                        onChange={handleChange}
                        name='name'
                    />
                </div>
                <div className='form-group'>
                    <label>Category</label>
                    <select
                        id='with_label'
                        className='custom_input'
                        onChange={handleChange}
                        name='category'
                    >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Opening time</label>
                    <input
                        id='with_label'
                        type='time'
                        className='custom_input'
                        onChange={handleChange}
                        name='open_hour'
                    />
                </div>
                <div className='form-group'>
                    <label>Closing time</label>
                    <input
                        id='with_label'
                        type='time'
                        className='custom_input'
                        onChange={handleChange}
                        name='close_hour'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='file'
                        className='custom_input'
                        onChange={handlePhoto}
                        name='image'
                    />
                </div>
                <div className='form-group'>
                    {valid_form}
                </div>
                <div id='add_modal'>
                    <p>**If the category of your restaurant doesn't appear add it
                        <span
                            id='span_btn'
                            onClick={() => setShow(true)}
                            className='ctm_link'
                        > here!
                        </span>
                    </p>
                </div>
            </form>
            <ModalAddCategory post_category={post_category} show={show} onHide={() => setShow(false)} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    own_restaurant: state.delivery.own_restaurant,
    categories: state.delivery.categories
})

const mapActionsToProps = {
    reg_rest,
    get_categories,
    post_category
}

export default connect(mapStateToProps, mapActionsToProps)(RegRestaurant)
