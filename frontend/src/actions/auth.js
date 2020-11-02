import {
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOADING,
    LOGOUT
} from './types'
import axios from 'axios'

export const token_config = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}

export const load_user = () => (dispatch, getState) => {
    dispatch({type: LOADING})
    axios
    .get('/api/auth/load_user', token_config(getState))
    .then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: AUTH_ERROR
        })
    })
}

export const login = (username, password) => (dispatch, getState) => {
    dispatch({type: LOADING})
    const body = JSON.stringify({username, password})

    axios
    .post('/api/auth/login', body, token_config(getState))
    .then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        })
    })
}

export const register = ({username, password, email}) => (dispatch, getState) => {
    dispatch({type: LOADING})
    const body = JSON.stringify({username, email, password})
    axios
    .post('/api/auth/register', body, token_config(getState))
    .then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data
        })
    })
}


export const logout = () => (dispatch, getState) => {
    dispatch({type: LOADING})
    axios
    .post('/api/auth/logout', null, token_config(getState))
    .then((res) => {
        dispatch({
            type: LOGOUT
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const register_as_manager = ({username, password, email}) => (dispatch, getState) => {
    dispatch({type: LOADING})
    const body = JSON.stringify({username, email, password})
    axios
    .post('/api/auth/manager/register', body, token_config(getState))
    .then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data
        })
    })
}
