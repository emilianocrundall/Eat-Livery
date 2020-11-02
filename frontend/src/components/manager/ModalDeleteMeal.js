import React from 'react'
import { Modal } from 'react-bootstrap'

export const ModalDeleteMeal = (props) => {

    const onButtonClick = function(){
        props.delete_meal(props.id)
        props.onHide()
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
                    Delete Meal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='p-4'>
                    <h3 className='text-center text-light p-2'>
                        Do you really want to delete this meal?
                    </h3>
                    <button
                        id='delete'
                        className='full_btn'
                        onClick={onButtonClick}
                    >
                        Yes
                    </button>
                    <button
                        id='delete'
                        className='btn_alt'
                        onClick={props.onHide}
                    >
                        No
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn_alt' onClick={props.onHide} >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteMeal
