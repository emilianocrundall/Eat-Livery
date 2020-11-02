import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom'
import { login } from '../actions/auth'
import { ArrowLeft } from 'react-bootstrap-icons'

export const Login = ({auth, user, login}) => {
    const [ data, setData ] = useState({
        username: '',
        password: '',
    })
    const [ error, setError ] = useState(false)

    useEffect(() => {
        if(auth.error){
            if(auth.error.non_field_errors){
                setError(auth.error.non_field_errors)
            }
        }
    }, [auth.error])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        login(data.username, data.password)
        
    }
    const history = useHistory()
    if(auth.isAuthenticated){
        history.goBack()
    }
    if(auth.isAuthenticated){
        if(user.isAdmin){
            return <Redirect to='/manage_restaurant' />
        } else{
            return <Redirect to='/' />
        }
    }
    return (
        <div className='form_container'>
            <div className='go_back m-4'>
                <button onClick={() => history.goBack()}>
                    <ArrowLeft />
                </button>
            </div>
            <form className='form_body' onSubmit={handleSubmit}>
                <h3 className='text-center text-light'>Login</h3>
                <div className='form-group'>
                    <input
                        type='text'
                        onChange={handleChange}
                        placeholder='Username' 
                        name='username'
                        className='custom_input'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        onChange={handleChange}
                        placeholder='Password' 
                        name='password'
                        className='custom_input'
                    />
                </div>
                <div className='form-group'>
                    {data.username && data.password !== '' ? (
                        <button className='full_btn'>Login</button>
                    ) : (
                        <button className='full_btn_d' disabled>Login</button>
                    )}
                </div>
                {error ? (
                    <div className='display_error'>{error}</div>
                ) : ''}
                <p>
                    Do not have any account?
                    <Link className='ctm_link' to='/register'> Click here!</Link>
                </p>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

const LoginWR = withRouter(Login)

export default connect(mapStateToProps, { login })(LoginWR)
