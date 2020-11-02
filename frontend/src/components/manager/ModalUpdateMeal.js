import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

export const ModalUpdateMeal = (props) => {
    const [data, setData] = useState({
        id: '',
        name: '',
        price: '',
        image: ''
    })
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if(props.id){
            axios.get(`/api/meals/${props.id}/`)
            .then((res) => {
                setData({
                    id: res.data.id,
                    name: res.data.name,
                    price: res.data.price,
                    image: res.data.image
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [props.id])
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setChanged(true)
    }
    const handleFile = (e) => {
        setData({
            ...data,
            image: e.target.value
        })
        setChanged(true)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append('name', data.name)
        form.append('price', data.price)
        if(data.image && data.image.name){
            form.append('image', data.image, data.image.name)
        }
        props.update_meal(data.id, form)
    }
    
    const valid_form = data.name && data.price && data.image !== '' ? (
        <button className='full_btn' onClick={props.onHide}>Save</button>
    ) : (
        <button className='full_btn_d' disabled>Save</button>
    )
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName='custom_modal'
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Meal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="md-form mb-3">
                        <input
                            type='text'
                            onChange={handleChange}
                            className='custom_input'
                            name='name'
                            placeholder='Name'
                            value={data.name}
                        />
                    </div>
                    <div className="md-form mb-3">
                        <input
                            type='text'
                            onChange={handleChange}
                            className='custom_input'
                            name='price'
                            placeholder='Price'
                            value={data.price}
                        />
                    </div>
                    <div className="md-form mb-3">
                        <input
                            type='file'
                            onChange={handleFile}
                            className='custom_input'
                            name='image'
                        />
                    </div>
                    <div className='text-center'>
                        {changed ? (
                            valid_form
                        ) : (
                            <button className='full_btn_d' disabled>Save</button>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn_alt' onClick={props.onHide} >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdateMeal