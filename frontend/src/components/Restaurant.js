import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from './common/Header'
import RestInfo from './common/RestInfo'
import RestLinks from './common/RestLinks'
import { get_restaurant, get_menu } from '../actions/delivery'
import SmallLoader from './common/SmallLoader'
import ModalUser from './common/ModalUser'
import { MyOrder } from './MyOrder'
import { Cart, ChevronDown, ChevronUp } from 'react-bootstrap-icons'

const Restaurant = ({
    auth,
    restaurant,
    food_by_rest,
    get_restaurant,
    get_menu,
    loading
}) => {
    const [ show, setShow ] = useState(false)
    const [ show_order, setShowOrder ] = useState(false)
    const [ cart, setCart ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ style, setStyle ] = useState({
        display: ''
    })

    const { id } = useParams()

    useEffect(() => {
        get_restaurant(id)
        get_menu(id)
    }, [])

    const find_meal = (id) => {
        if(cart && cart.find((meal) => meal.id === id)){
            return true
        } else {
            return false
        }
    }

    let meals = food_by_rest.map((meal) => {
        return {
            ...meal,
            quantity: 1
        }
    })

    const handleInc = (index)  => {
        let new_array = [...cart]
        
        if(new_array.length > 0){
            new_array[index].quantity ++
            setCart(new_array)
            setTotal(total + Number(new_array[index].price))
        }
    }
    const handleDec = (index)  => {
        let new_array = [...cart]
        
        if(new_array.length > 0){
            
            if(new_array[index].quantity > 1){
                new_array[index].quantity = new_array[index].quantity - 1
                setCart(new_array)
                setTotal(total - Number(new_array[index].price))
            }
        }
    }
    const showOrder = () => {
        setStyle({
            ...style,
            display: 'block'
        })
        setShowOrder(true)
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
            <div className='m-4'>
            {meals && meals.length !== 0 ? (
                meals.map((meal, index) => (
                    <div className='meal' key={index}>
                        <img src={meal.image} alt={meal.photo}/>
                        <span>{meal.name}</span>
                        <p><strong>$ {meal.price}</strong></p>
                        {auth.isAuthenticated ? (
                            find_meal(meal.id) ? (
                                <React.Fragment>
                                <div className='added_cont'>
                                    <label>Quantity: </label>
                                    <p><strong>{cart[index].quantity}</strong></p>
                                    <button onClick={() => handleInc(index)} className='tiny_btn'>
                                        <ChevronUp />
                                    </button>
                                    <button onClick={() => handleDec(index)} className='tiny_btn'>
                                        <ChevronDown />
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        setTotal(total - meal.price * cart[index].quantity)
                                        setCart([...cart.filter((food) => food.id !== meal.id)])
                                    }}
                                    className='mini_btn'
                                >
                                    Remove from cart
                                </button>
                                </React.Fragment>
                            ) : ( 
                                <button
                                    onClick={() => {
                                        setCart([...cart, meal])
                                        setTotal(total + meal.price)
                                    }}
                                    className='mini_btn'>
                                    Add to cart
                                </button>
                            )
                        ) : (
                            <button onClick={() => setShow(true)} className='mini_btn'>
                                Add to cart
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <h2 className='text-center p-3'>Seems like this restaurant has no meals yet</h2>
            )}
            </div>
            <button className='cart_button'><Cart onClick={showOrder} /></button>
        </div>
        <ModalUser show={show} onHide={() => setShow(false)} />
        <MyOrder
            show={show_order}
            onHide={() => setShowOrder(false)}
            style={style}
            cart={cart}
            total={total}
            restaurant={restaurant.id}
        />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    restaurant: state.delivery.restaurant,
    food_by_rest: state.delivery.food_by_rest,
    loading: state.delivery.loading
})

const mapActionsToProps = {
    get_restaurant,
    get_menu
}

export default connect(mapStateToProps, mapActionsToProps)(Restaurant)
