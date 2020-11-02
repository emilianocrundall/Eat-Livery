import React,{ useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { get_restaurant, get_rest_reviews, post_rest_review } from '../actions/delivery'
import Header from './common/Header'
import RestInfo from './common/RestInfo'
import RestLinks from './common/RestLinks'
import SmallLoader from './common/SmallLoader'
import MyOrder from './MyOrder'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { StarFill } from 'react-bootstrap-icons'

const ReviewsRest = ({
    restaurant,
    loading,
    auth,
    rest_reviews,
    get_restaurant,
    get_rest_reviews,
    post_rest_review
}) => {

    const [ data, setData ] = useState({
        text: '',
        score: ''
    })
    const { id } = useParams()

    useEffect(() => {
        get_restaurant(id)
        get_rest_reviews(id)
    }, [])


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const ratingChanged = (newRating) => {
        setData({
            ...data,
            score: newRating
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        post_rest_review(restaurant.id, data)
        setData({
            ...data,
            text: '',
            score: ''
        })
    }
    const format_date = (date) => {
        let new_date = moment(date).format('MMMM Do YYYY, h:mm')
        return new_date
    }

    if(loading){
        return <SmallLoader />
    }
    return (
        <React.Fragment>
            <div className='second_cont_rest'>
                <Header title={restaurant.name} image={restaurant.image} />
                <RestInfo restaurant={restaurant} />
                <RestLinks id={restaurant.id} />
                <form onSubmit={handleSubmit} className='comment_form'>
                    <h4>Make a comment:</h4>
                    <label className='p-2'>Comment:</label>
                    <input
                        onChange={handleChange}
                        name='text'
                        placeholder='Write your comment'
                    />
                    <label className='p-2'>Qualification:</label>
                    <ReactStars
                        value={Number(data.score)}
                        count={5}
                        onChange={ratingChanged}
                        size={30}
                        color2={'#ffd700'}
                        half={false}
                    />{auth.isAuthenticated ? (
                        data.text && data.score !== '' ? (
                            <button type='submit' className='full_btn'>Submit</button>
                        ) : (
                            <button className='full_btn_d' disabled>Submit</button>
                        )
                    ) : (
                        <Link className='full_btn' to='/login'>Submit</Link>
                    )}
                </form>
                {rest_reviews && rest_reviews.length > 0 ? (
                    rest_reviews.map((review) => (
                        <div className='review' key={review.id}>
                            <h6>{review.user}</h6>
                            <p>{format_date(review.date)}</p>
                            <span className='second_icon'>{review.score} <StarFill /> </span>
                            <span> {review.text}</span>
                        </div>
                    ))
                ) : (
                    <h3 className='p-3 text-center'>There's no reviews yet</h3>
                )}
            </div>
            <MyOrder />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    restaurant: state.delivery.restaurant,
    loading: state.delivery.loading,
    rest_reviews: state.delivery.rest_reviews
})

const mapActionsToProps = {
    get_restaurant,
    get_rest_reviews,
    post_rest_review
}

export default connect(mapStateToProps, mapActionsToProps)(ReviewsRest)