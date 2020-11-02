import { combineReducers } from 'redux'
import auth from './auth'
import delivery from './delivery'

export default combineReducers({
    auth: auth,
    delivery: delivery
})
