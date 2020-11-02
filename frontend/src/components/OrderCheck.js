import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from './common/Header'
import moment from 'moment'
import { get_order_details } from '../actions/delivery'
import '../styles/progress_tracker.css'

const OrderCheck = ({order_detail, get_order_details}) => {

    const { id } = useParams()
    useEffect(() => {
        get_order_details(id)
    }, [])

    const format_date = (date) => {
        let new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }
    return (
        <div className='order_check_cont'>
            <Header title={format_date(order_detail.date)} />
            <h3 className='p-3'>Status of your order:</h3>
            {order_detail.status === 1 ? (
                <h3 className='p-3 text-center'>Your order was accepted by the restaurant</h3>
            ) : order_detail.status === 2 ? (
                <h3 className='p-3 text-center'>Your order is currently being made</h3>
            ) : order_detail.status === 3 ? (
                <h3 className='p-3 text-center'>Your order is on the way!</h3>
            ) : (
                <h3 className='p-3 text-center'>Your order is sent to the restaurant but is not checked yet</h3>
            )}
            <div className="container">
                <ol className="progress-meter">
                    <li className="progress-point done"></li>
                    {order_detail.status === 1 ? (
                        <React.Fragment>
                            <li className="progress-point done"></li>
                            <li className="progress-point todo"></li>
                            <li className="progress-point todo"></li>
                        </React.Fragment>
                    ) : order_detail.status === 2 ? (
                        <React.Fragment>
                            <li className="progress-point done"></li>
                            <li className="progress-point done"></li>
                            <li className="progress-point todo"></li>
                        </React.Fragment> 
                    ) : order_detail.status === 3 ? (
                        <React.Fragment>
                            <li className="progress-point done"></li>
                            <li className="progress-point done"></li>
                            <li className="progress-point todo"></li>
                        </React.Fragment> 
                    ) : (
                        <React.Fragment>
                            <li className="progress-point todo"></li>
                            <li className="progress-point todo"></li>
                            <li className="progress-point todo"></li>
                        </React.Fragment> 
                    )}
                </ol>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    order_detail: state.delivery.order_detail
})

export default connect(mapStateToProps, { get_order_details })(OrderCheck)
