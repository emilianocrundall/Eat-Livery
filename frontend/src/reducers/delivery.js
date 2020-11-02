import {
    GET_CATEGORIES_REST,
    REST_BY_CATEGORY,
    FOOD_BY_REST,
    GET_CATEGORY,
    GET_RESTAURANT,
    GET_MEAL,
    UPDATE_MEAL,
    DELETE_MEAL,
    ADD_MEAL,
    ADD_CAT_REST,
    GET_OWN_RESTAURANT,
    REG_RESTAURANT,
    NO_RESTAURANT,
    LOADING_CONTENT,
    GET_RESTAURANT_REVIEWS,
    POST_REST_REVIEW,
    GET_USER_ORDERS,
    GET_MANAGER_ORDERS,
    POST_ORDER,
    GET_ORDER_DETAIL, REST_ORDERS, GET_ORDER_MEALS, DELETE_ORDER, UPDATE_ORDER
} from '../actions/types'

const initialState = {
    categories: [],
    category: {},
    rest_by_category: [],
    food_by_rest: [],
    restaurant: {},
    meal: {},
    order_detail: {},
    full_order: [],
    own_restaurant: {},
    loading: true,
    rest_reviews: [],
    orders_rest: [],
    ordered_meals: []
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CATEGORIES_REST:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            }
        case REST_BY_CATEGORY:
            return {
                ...state,
                rest_by_category: action.payload,
                loading: false
            }
        case GET_RESTAURANT:
            return {
                ...state,
                restaurant: action.payload,
                loading: false
            }
        case LOADING_CONTENT:
            return {
                ...state,
                loading: true
            }
        case GET_OWN_RESTAURANT:
            return {
                ...state,
                own_restaurant: action.payload,
                loading: false
            }
        case NO_RESTAURANT:
            return {
                ...state,
                own_restaurant: false,
                loading: false
            }
        case ADD_CAT_REST:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.payload
                ]
            }
        case REG_RESTAURANT:
            return {
                ...state,
                own_restaurant: action.payload,
                loading: false
            }
        case FOOD_BY_REST:
            return {
                ...state,
                food_by_rest: action.payload,
                loading: false
            }
        case GET_MEAL:
            return {
                ...state,
                meal: action.payload,
                loading: false
            }
        case ADD_MEAL:
            return {
                ...state,
                food_by_rest: [
                    ...state.food_by_rest,
                    action.payload
                ]
            }
        case DELETE_MEAL:
            return {
                ...state,
                food_by_rest: [
                    ...state.food_by_rest.filter((food) => food.id !== action.payload)
                ]
            }
        case UPDATE_MEAL:
            return {
                ...state,
                loading: false
            }
        case GET_USER_ORDERS:
            return {
                ...state,
                user_orders: action.payload
            }
        case GET_MANAGER_ORDERS:
            return {
                ...state,
                manager_orders: action.payload
            }
        case GET_RESTAURANT_REVIEWS:
            return {
                ...state,
                rest_reviews: action.payload
            }
        case POST_REST_REVIEW:
            return {
                ...state,
                rest_reviews: [
                    ...state.rest_reviews,
                    action.payload
                ]
            }
        case POST_ORDER:
            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            localStorage.removeItem('restaurant')
        case GET_ORDER_DETAIL:
            return {
                ...state,
                order_detail: action.payload
            }
        case REST_ORDERS:
            return {
                ...state,
                orders_rest: action.payload
            }
        case GET_ORDER_MEALS:
            return {
                ...state,
                ordered_meals: action.payload
            }
        case DELETE_ORDER:
            return {
                ...state,
                ordered_meals: [
                    ...state.ordered_meals.filter((meal) => meal.id !== action.payload)
                ],
                order_detail: {}
            }
        case UPDATE_ORDER:
            return {
                ...state,
                order_detail: action.payload
            }
        default:
            return state
    }
}
