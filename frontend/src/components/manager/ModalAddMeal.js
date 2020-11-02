import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'

export const ModalAddMeal = (props) => {

    const [data, setData] = useState({
        name: '',
        image: '',
        price: ''
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleFile = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('name', data.name)
        form.append('price', data.price)
        form.append('image', data.image, data.image.name)
        props.add_meal(form)
        setData({
            name: '',
            price: '',
            image: ''
        })
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
                    Add Meal
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
                        />
                    </div>
                    <div className="md-form mb-3">
                        <input
                            type='text'
                            onChange={handleChange}
                            className='custom_input'
                            name='price'
                            placeholder='Price'
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
                        {valid_form}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn_alt' onClick={props.onHide} >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddMeal