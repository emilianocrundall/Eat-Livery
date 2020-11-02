import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export const ModalAddCategory = (props) => {
    const [ data, setData ] = useState({
        name: ""
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            "name": data.name
        }
        props.post_category(body)
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="sm"
            dialogClassName='custom_modal'
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="md-form mb-3">
                        <input
                            onChange={handleChange}
                            className='custom_input'
                            name='name'
                            placeholder='Name'
                        />
                    </div>
                    <div className='text-center'>
                        {data.name !== '' ? (
                            <button className='full_btn' onClick={props.onHide}>Save</button>
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

export default ModalAddCategory