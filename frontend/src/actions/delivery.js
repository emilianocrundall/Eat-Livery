import {
    GET_CATEGORIES_REST,
    REST_BY_CATEGORY,
    FOOD_BY_REST,
    GET_RESTAURANT,
    NO_RESTAURANT,
    GET_OWN_RESTAURANT,
    REG_RESTAURANT,
    GET_MEAL,
    UPDATE_MEAL,
    DELETE_MEAL,
    ADD_MEAL,
    ADD_CAT_REST,
    LOADING_CONTENT,
    GET_CATEGORY,
    GET_RESTAURANT_REVIEWS,
    POST_REST_REVIEW,
    GET_USER_ORDERS,
    GET_MANAGER_ORDERS,
    POST_ORDER,
    GET_ORDER_DETAIL, REST_ORDERS, GET_ORDER_MEALS, DELETE_ORDER, UPDATE_ORDER
}
from './types'
import { token_config } from './auth'
import axios from 'axios'

export const get_categories = () => (dispatch, getState) => {
    axios
    .get('/api/categories_rest/', token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_CATEGORIES_REST,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_own_restaurant = () => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get('/api/own_restaurant/', token_config(getState))
    .then((res) => {
        if(res.status === 204){
            dispatch({
                type: NO_RESTAURANT
            })
        } else {
            dispatch({
                type: GET_OWN_RESTAURANT,
                payload: res.data
            })
        }
    }).catch((err) => {
        console.log(err)
    })
}

export const reg_rest = (data) => (dispatch, getState) => {
    axios
    .post('/api/add_restaurant/', data, token_config(getState))
    .then((res) => {
        dispatch({
            type: REG_RESTAURANT,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const post_category = (data) => (dispatch, getState) => {
    axios
    .post('/api/add_rest_category/', data, token_config(getState))
    .then((res) => {
        dispatch({
            type: ADD_CAT_REST,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_menu = (id) => (dispatch, getState) => {
    axios
    .get(`/api/${id}/menu/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: FOOD_BY_REST,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const add_meal = (data) => (dispatch, getState) => {
    axios
    .post('/api/add_meal/', data, token_config(getState))
    .then((res) => {
        dispatch({
            type: ADD_MEAL,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const update_meal = (id, data) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .put(`/api/update_meal/${id}/`, data, token_config(getState))
    .then((res) => {
        dispatch({
            type: UPDATE_MEAL
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const delete_meal = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/delete_meal/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: DELETE_MEAL,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_meal = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/meals/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_MEAL,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_category = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/categories_rest/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_rest_by_cat = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/rest_by_cat/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: REST_BY_CATEGORY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_restaurant = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/restaurants/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_RESTAURANT,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_user_orders = () => (dispatch, getState) => {
    axios
    .get('/api/user_orders/', token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_USER_ORDERS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}
export const get_manager_orders = (id) => (dispatch, getState) => {
    axios
    .get(`/api/manager_orders/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_MANAGER_ORDERS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_rest_reviews = (id) => (dispatch, getState) => {
    dispatch({type: LOADING_CONTENT})
    axios
    .get(`/api/reviews/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_RESTAURANT_REVIEWS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const post_rest_review = (id, data) => (dispatch, getState) => {
    axios
    .post(`/api/post_review/${id}/`, data, token_config(getState))
    .then((res) => {
        dispatch({
            type: POST_REST_REVIEW,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const post_order = (data) => (dispatch, getState) => {
    axios
    .post('/api/create_order/', data, token_config(getState))
    .then((res) => {
        dispatch({
            type: POST_ORDER
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_order_details = (id) => (dispatch, getState) => {
    axios
    .get(`/api/orders/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_ORDER_DETAIL,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_rest_orders = (id) => (dispatch, getState) => {
    axios
    .get(`/api/rest_orders/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: REST_ORDERS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_ordered_meals = (id) => (dispatch, getState) => {
    axios
    .get(`/api/meals_from_order/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: GET_ORDER_MEALS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const delete_order = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/delete_order/${id}/`, token_config(getState))
    .then((res) => {
        dispatch({
            type: DELETE_ORDER,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const update_order = (id, data) => (dispatch, getState) => {
    axios
    .put(`/api/status_update/${id}/`, data, token_config(getState))
    .then((res) => {
        dispatch({
            type: UPDATE_ORDER,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}
