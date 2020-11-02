import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter, useHistory, useLocation } from 'react-router-dom'
import { register, register_as_manager } from '../actions/auth'
import { ArrowLeft } from 'react-bootstrap-icons'

export const Register = ({auth, user, register, register_as_manager}) => {
    const [ data, setData ] = useState({
        username: '',
        email: '',
        password: '',
        second_pass: ''
    })
    const [ error, setError ] = useState(false)

    useEffect(() => {
        if(auth.error){
            if(auth.error.email){
                setError(auth.error.email)
            } else if(auth.error.username){
                setError(auth.error.username)
            }
        }
    }, [auth.error])

    const location = useLocation()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(data.password.length < 6){
            setError('Password too short')
        } else if(data.password !== data.second_pass){
            setError('Passwords do not match')
        } else {
            const user = {}
            user.username = data.username
            user.email = data.email
            user.password = data.password

            if(location.pathname.match(/register_manager/)){
                register_as_manager(user)
            }else{
                register(user)
                history.goBack()
            }
            
        }
    }
   
    if(auth.isAuthenticated){
        if(user && user.isAdmin){
            return <Redirect to='/manage_restaurant' />
        } else{
            return <Redirect to='/' />
        }
    }
    const valid_form = data.username
    && data.email
    && data.password
    && data.second_pass !== '' ? (
        <button className='full_btn'>Register</button>
    ) : (
        <button className='full_btn_d' disabled>Register</button>
    )
    return (
        <div className='form_container'>
            <div className='go_back m-4'>
                <button onClick={() => history.goBack()}>
                    <ArrowLeft />
                </button>
            </div>
            <form className='form_body' onSubmit={handleSubmit}>
                {location.pathname.match(/register_manager/) ? (
                    <h3 className='text-center text-light'>Register as Manager</h3>
                ) : (
                    <h3 className='text-center text-light'>Register</h3>
                )}
                
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
                        type='text'
                        onChange={handleChange}
                        placeholder='Email'
                        name='email'
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
                    <input
                        type='password'
                        onChange={handleChange}
                        placeholder='Confirm password'
                        name='second_pass'
                        className='custom_input'
                    />
                </div>
                <div className='form-group'>
                    {valid_form}
                </div>
                {error ? (
                    <div className='display_error'>{error}</div>
                ) : ''}
                <p>
                    Already have an account?
                    <Link className='ctm_link' to='/login'> Click here!</Link>
                </p>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

const mapActionsToProps = { register, register_as_manager }

const RegisterWR = withRouter(Register)

export default connect(mapStateToProps, mapActionsToProps)(RegisterWR)
