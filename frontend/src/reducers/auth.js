import {
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOADING,
    LOGOUT
} from '../actions/types'

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: false,
    error: null
}

export default function(state=initialState, action){
    switch(action.type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true,
                error: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                user: null,
                token: null,
                loading: false,
                isAuthenticated: false,
                error: null
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        default:
            return state
    }
}
